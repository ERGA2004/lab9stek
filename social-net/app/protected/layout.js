'use client'; // Добавляем директиву 'use client' для клиентского компонента

import { useEffect } from 'react'; // Хуки работают только в клиентских компонентах
import { useRouter } from 'next/navigation'; // Для работы с навигацией
import Cookies from 'js-cookie'; // Для работы с куки

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken'); // Получаем accessToken из cookies

    // Если нет токена, редиректим на страницу логина
    if (!accessToken) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div>
      {children} {/* Рендерим содержимое страниц */}
    </div>
  );
}
