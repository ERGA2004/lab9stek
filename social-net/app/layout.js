import { Inter } from 'next/font/google'; // Подключаем шрифт Inter
import './styles/globals.css'; // Обновленный путь к globals.css

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: 'Social Network', // Заголовок для страницы
  description: 'A social network built with Next.js', // Описание для страницы
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Дополнительные мета-данные и другие элементы можно добавлять здесь */}
      </head>
      <body className={inter.className}> {/* Применяем класс шрифта */}
        {children} {/* Рендерим содержимое страниц */}
      </body>
    </html>
  );
}
