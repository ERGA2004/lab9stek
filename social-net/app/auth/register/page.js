'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register as registerUser } from '/services/auth';  // Ваш сервис для регистрации

// Схема валидации для регистрации
const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

const RegisterPage = () => {
  // Используем React Hook Form для обработки данных формы
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Функция, вызываемая при отправке формы
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);  // Отправляем данные на сервер для регистрации
      window.location.href = '/auth/login'; // Перенаправляем на страницу входа после успешной регистрации
    } catch (error) {
      console.error('Registration failed', error);  // Выводим ошибку в консоль
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Поле для ввода email */}
      <input {...formRegister('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      {/* Поле для ввода username */}
      <input {...formRegister('username')} placeholder="Username" />
      {errors.username && <span>{errors.username.message}</span>}

      {/* Поле для ввода пароля */}
      <input {...formRegister('password')} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      {/* Кнопка для отправки формы */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
