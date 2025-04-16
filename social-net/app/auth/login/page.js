'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '/services/auth'; 


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage = () => {
  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(loginSchema),
  })
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try{
      await login(data);
      router.push('/protected/profile');
    } catch (err){
      
    }
    try {
      await login(data); 
      router.push('/protected/profile');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      {error && <span>{error}</span>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
