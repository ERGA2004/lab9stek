// services/auth.js
import { api } from './api';  // Импортируем api как named export
import Cookies from 'js-cookie';

// Функция для регистрации
export const register = async (userData) => {
  console.log('Sending data to register:', userData);  // Логируем отправленные данные
  const response = await api.post('/auth/register', userData);  // Отправляем запрос на сервер
  console.log('Registration response:', response);  // Логируем ответ от сервера
  return response.data;  // Возвращаем данные ответа
};

// Функция для входа пользователя
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials); 
  Cookies.set('accessToken', response.data.accessToken, { expires: 15 / 1440 });
  Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
  return response.data; 
};

// Функция для выхода
export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken'); 
  window.location.href = '/auth/login';
};

// Функция для загрузки аватара через Uploadthing
export const uploadAvatar = async (formData) => {
  const response = await api.post('/auth/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Функция для удаления аватара
export const deleteAvatar = async () => {
  const response = await api.delete('/auth/avatar');
  return response.data;
};

// Функция для получения профиля
export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};
