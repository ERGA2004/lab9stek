import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Базовый URL для запросов
});

// Добавление токена в заголовки
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Автоматическое обновление токенов при ошибке 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Обработка обновления токенов
      const refreshToken = Cookies.get('refreshToken');
      const response = await api.post('/auth/refresh-token', { refreshToken });
      Cookies.set('accessToken', response.data.accessToken);
      error.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return axios(error.config); // Повторный запрос с новым токеном
    }
    return Promise.reject(error);
  }
);

export default api;
