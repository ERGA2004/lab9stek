'use client'; // Клиентский компонент

import { useEffect, useState } from 'react'; // Хуки для работы с состоянием и эффектами
import { useRouter } from 'next/navigation'; // Для навигации
import Cookies from 'js-cookie'; // Для работы с куки
import { getProfile } from '/services/auth'; // Функция для получения данных профиля

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // Состояние для хранения данных профиля
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки
  const router = useRouter(); // Хук для навигации

  useEffect(() => {
    // Функция для получения данных профиля
    const fetchProfile = async () => {
      try {
        const data = await getProfile(); // Запрос для получения профиля
        setProfile(data); // Сохраняем профиль в состояние
      } catch (err) {
        setError('Failed to fetch profile'); // Обработка ошибки
      } finally {
        setLoading(false); // Завершаем процесс загрузки
      }
    };

    fetchProfile();
  }, []); // Эффект вызовется один раз при монтировании компонента

  const handleLogout = () => {
    // Очистка куки (accessToken и refreshToken)
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/auth/login'); // Редирект на страницу логина
  };

  if (loading) {
    return <div>Loading...</div>; // Отображение индикатора загрузки
  }

  if (error) {
    return <div>{error}</div>; // Отображение ошибки
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {profile?.email}</p> {/* Отображение email пользователя */}
      <p>Username: {profile?.username}</p> {/* Отображение username пользователя */}
      <button onClick={handleLogout}>Logout</button> {/* Кнопка для выхода */}
    </div>
  );
};

export default ProfilePage;
