'use client';

import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
});

export default function HomePage() {
  const router = useRouter();

  const handleJoin = () => {
    router.push('/auth/register');
  };

  return (
    <div className={`container ${inter.className}`}>
      <h1>Welcome to Social Network</h1>
      <button className="join-button" onClick={handleJoin}>Join Now</button>



      <style jsx>{`
        .container {
          font-family: 'Inter', sans-serif;
          background-color: #f5f7fa;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        h1 {
          font-size: 3.5rem;
          color: #34495e;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .join-button {
          padding: 18px 36px;
          font-size: 1.2rem;
          background: linear-gradient(135deg, #00bcd4, #8e44ad);
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .join-button:hover {
          background: linear-gradient(135deg, #2980b9, #9b59b6);
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .join-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.5);
        }
      `}</style>
    </div>
  );
}
