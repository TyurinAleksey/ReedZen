import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
  username: z.string().min(3, 'Имя пользователя должно быть минимум 3 символа'),
  avatarUrl: z.string().url('Некорректный URL аватара').optional(),
  role: z.enum(['user', 'admin']).default('user')
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
  });
  
export type LoginInput = z.infer<typeof registerSchema>;