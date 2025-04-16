// services/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Создаем экземпляр axios для API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Базовый URL для API
});

// Добавляем интерсептор для добавления токена в заголовки запросов
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Обработчик для перехвата ошибок, например, если токен истек
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = Cookies.get('refreshToken');
      const response = await api.post('/auth/refresh-token', { refreshToken });
      Cookies.set('accessToken', response.data.accessToken);
      error.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return axios(error.config); // Повторяем запрос с новым токеном
    }
    return Promise.reject(error);
  }
);

// Экспортируем `api` как named export
export { api };
