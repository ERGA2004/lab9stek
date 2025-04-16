// middleware/errorHandler.js

import multer from 'multer';  // Импортируем multer для обработки ошибок загрузки файлов
import ApiError from '../utils/ApiError.js';  // Класс ошибок

export default function errorHandler(err, req, res, next) {
  console.log('Error caught:', err);  // Логируем все ошибки

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File upload error', error: err.message });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
      stack: err.stack,
    });
  }

  // Стандартная обработка ошибок
  return res.status(500).json({
    message: 'Internal Server Error',
    stack: err.stack,
  });
}
