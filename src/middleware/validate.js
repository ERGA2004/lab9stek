import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

// Валидация для регистрации
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

// Валидация для логина
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Валидация для постов
const postSchema = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000)
    .required()
    .error(() => new ApiError(400, 'Content must be between 1 and 1000 characters')),
});

// Экспортируем функцию валидации для регистрации
export const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);  // Передаем ошибку в следующий middleware
  }
  next();
};

// Экспортируем функцию валидации для логина
export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

// Экспортируем функцию валидации для постов
export const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};
