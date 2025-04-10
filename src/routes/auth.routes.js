import express from 'express';
import {
  register,
  login,
  refreshToken,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validateLogin, validateRegistration } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);

// Добавляем новый маршрут для получения профиля пользователя
router.get('/profile', protect, async (req, res) => {
  try {
    // Получаем пользователя по ID, который хранится в токене (через protect middleware)
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Отправляем данные профиля (email и username)
    res.json({
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Пример защищенного маршрута
router.get('/protected', protect, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

export default router;
