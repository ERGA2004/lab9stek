'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google'; // Подключаем шрифт Inter

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
});

export default function HomePage() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className={`container ${inter.className}`}>
      <header className="header">
        <h1>Welcome to Social Network</h1>
        <p>Your place to connect with people!</p>
      </header>

      <main className="main-content">
        <section className="info-section">
          <h2>Explore</h2>
          <p>Start connecting with friends, family, and colleagues!</p>
        </section>

        <section className="cta-section">
          <h2>Join Us</h2>
          <button className="cta-button" onClick={incrementCount}>Join the Network</button>
          <p>You are visitor number: {count}</p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 Social Network. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 20px;
        }

        .header {
          text-align: center;
          margin-top: 50px;
        }

        .header h1 {
          font-size: 3rem;
          color: #333;
        }

        .header p {
          font-size: 1.2rem;
          color: #555;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 40px;
        }

        .info-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .info-section h2 {
          font-size: 2rem;
          color: #007bff;
        }

        .info-section p {
          font-size: 1.2rem;
          color: #555;
        }

        .cta-section {
          text-align: center;
          margin-top: 30px;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .cta-section h2 {
          font-size: 2rem;
          color: #007bff;
        }

        .cta-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 15px 25px;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background-color: #0056b3;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 0.9rem;
          color: #888;
        }
      `}</style>
    </div>
  );
}
