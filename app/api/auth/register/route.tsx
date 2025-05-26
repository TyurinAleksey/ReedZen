import { NextResponse } from 'next/server';
import connectToDatabase from "@DB/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema } from "@DB/validations/auth";
import createUsersSchema from "@DB/Sсhema/UserSсhema"; // Предполагается, что у вас есть модель User

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const validationResult = registerSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password, username, avatarUrl, role } = validationResult.data;
    const connection = await connectToDatabase();
    await createUsersSchema(connection);

    const [existingEmail] = await connection.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    const [existingUsername] = await connection.query(
      'SELECT * FROM users WHERE username = ?', 
      [username]
    );

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { message: "Пользователь с таким email уже существует" },
        { status: 400 }
      );
    }

    if (existingUsername.length > 0) {
      return NextResponse.json(
        { message: "Пользователь с таким именем уже существует" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password, avatarUrl, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, passwordHash, avatarUrl, role]
    );

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET не настроен');
    }

    const token = jwt.sign(
      { _id: result.insertId, role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return NextResponse.json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: result.insertId,
        username,
        email,
        role,
        avatarUrl
      },
      token
    }, { status: 201 });

  } catch (error) {
    console.error("Ошибка регистрации:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}