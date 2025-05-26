import { NextResponse } from 'next/server';
import connectToDatabase from "@DB/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@DB/validations/auth";

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    
    const validationResult = loginSchema.safeParse(requestData);
    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;
    const connection = await connectToDatabase();

    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    ) as any[];

    if (!users || users.length === 0) {
      return NextResponse.json(
        { message: "Неверный email или пароль" },
        { status: 401 }
      );
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Неверный email или пароль" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET не настроен');
    }

    const token = jwt.sign(
      { 
        _id: user.id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password: _, ...userData } = user;

    await connection.query(
        'UPDATE users SET lastLogin = NOW() WHERE id = ?',
        [user.id]
    );

    return NextResponse.json({
      message: "Авторизация успешна",
      user: userData,
      token
    }, { status: 200 });

  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}