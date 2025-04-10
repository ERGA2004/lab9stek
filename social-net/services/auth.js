import axios from 'axios';
import Cookies from 'js-cookie';

// Создаем axios-инстанс для работы с бэкендом
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Адрес твоего бэкенда
});

// Добавление интерсептора для автоматической подстановки accessToken в заголовки
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken'); // Получаем токен из cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обработка 401 ошибки (токен истек, нужно обновить)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Проверка на истекший токен
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          // Попробуем обновить токен
          const response = await api.post('/auth/refresh', { refreshToken });
          const newAccessToken = response.data.accessToken;
          // Сохраняем новый accessToken
          Cookies.set('accessToken', newAccessToken, { expires: 15 / 1440 });

          // Повторяем оригинальный запрос с новым токеном
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(error.config); // Отправляем запрос снова с новым токеном
        } catch (refreshError) {
          // Если не удалось обновить токен, перенаправляем на страницу логина
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Функция для регистрации
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Функция для логина
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  Cookies.set('accessToken', response.data.accessToken, { expires: 15 / 1440 }); // Сохраняем accessToken в cookies
  Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 }); // Сохраняем refreshToken в cookies
  return response.data;
};

// Функция для получения профиля
export const getProfile = async () => {
  try {
    const token = Cookies.get('accessToken'); // Получаем accessToken из cookies
    console.log("Access Token:", token); // Логируем токен для проверки
    
    const response = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Используем токен из cookies
      },
    });

    console.log("Profile data:", response.data); // Логируем данные профиля для проверки
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile", error); // Логируем ошибку, если она есть
    throw error; // Пробрасываем ошибку дальше
  }
};


// Функция для выхода из системы (удаляем токены)
export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  window.location.href = '/auth/login'; // Редирект на страницу логина
};
