import User from '../models/User.model.js';  // Импортируем модель User
import { generateAccessToken, generateRefreshToken } from '../config/jwt.js';  // Генерация токенов
import ApiError from '../utils/ApiError.js';  // Класс ошибок
import asyncHandler from '../utils/asyncHandler.js';  // Обработчик асинхронных ошибок
import jwt from 'jsonwebtoken';  // Для работы с JWT
import multer from 'multer';  // Для загрузки аватаров
import path from 'path';

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Папка для хранения аватаров
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Генерация уникального имени
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Регистрация пользователя
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received data:', req.body);  // Логируем данные запроса

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    console.log('User already exists');
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({ username, email, password });
  console.log('User created:', user);  // Логируем информацию о созданном пользователе

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    accessToken,
    refreshToken,
  });
});

// Логин пользователя
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt with email:', email);  // Логируем email для отладки

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    console.log('Invalid credentials');  // Логируем ошибку
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    accessToken,
    refreshToken,
  });
});

// Обновление токена (refresh)
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(401, 'Refresh token required');

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const newAccessToken = generateAccessToken(user._id);
  res.json({ accessToken: newAccessToken });
});

// Обработчик для загрузки аватара через Multer
export const uploadAvatarController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }

  const user = await User.findById(req.user.id);  // Получаем пользователя
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Сохраняем путь к файлу в базе данных
  user.avatar = `/uploads/${req.file.filename}`;
  await user.save();

  res.status(200).json({ avatar: user.avatar });  // Возвращаем путь к аватару
});
