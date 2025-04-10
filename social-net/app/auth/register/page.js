'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register as registerUser } from '/services/auth';

// Схема валидации
const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

const RegisterPage = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data); // Вызываем функцию регистрации
      window.location.href = '/auth/login'; // Перенаправляем на страницу логина
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...formRegister('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...formRegister('username')} placeholder="Username" />
      {errors.username && <span>{errors.username.message}</span>}
      
      <input {...formRegister('password')} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
