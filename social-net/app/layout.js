import { Inter } from 'next/font/google'; 
import './styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: 'Social Network', 
  description: 'A social network built with Next.js', 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}> 
        {children} 
      </body>
    </html>
  );
}
