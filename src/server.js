import dotenv from 'dotenv';  // Импортируем dotenv

dotenv.config();  // Загружаем переменные окружения из .env файла

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';  // Подключаем к базе данных
import authRoutes from './routes/auth.routes.js';  // Роуты аутентификации
import postRoutes from './routes/post.routes.js';  // Роуты для постов
import errorHandler from './middleware/errorHandler.js';  // Обработчик ошибок

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
