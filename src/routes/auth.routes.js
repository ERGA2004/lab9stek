import express from 'express';
import { register, login, refreshToken, uploadAvatarController } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';  // Защищаем маршруты
import { validateRegistration, validateLogin } from '../middleware/validate.js';  // Валидация данных
import multer from 'multer';  // Импортируем multer
import User from '../models/User.model.js';  // Импортируем модель User
import ApiError from '../utils/ApiError.js';  // Импортируем ApiError

const router = express.Router();

// Настроим multer для загрузки аватара
const upload = multer({ dest: 'uploads/' });

// Регистрация, логин и обновление токенов
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);

// Защищенные маршруты
router.get('/profile', protect, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      username: user.username,
      avatar: user.avatar,  // Добавляем вывод аватара (если он есть)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Маршрут для загрузки аватара
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatarController);

// Маршрут для удаления аватара
router.delete('/avatar', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.avatar) {
      return next(new ApiError(404, 'Avatar not found'));
    }

    user.avatar = null;  // Удаляем аватар
    await user.save();

    res.status(200).json({ message: 'Avatar deleted successfully' });
  } catch (err) {
    next(err);  // Передаем ошибку в обработчик ошибок
  }
});

export default router;
