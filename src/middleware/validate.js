import Joi from 'joi'
import ApiError from '../utils/ApiError.js'

const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new ApiError(400, 'Username must be 3-30 alphanumeric characters')),
  email: Joi.string()
    .email()
    .required()
    .error(new ApiError(400, 'Valid email is required')),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required()
    .error(new ApiError(400, 'Password must be 6-30 characters')),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const postSchema = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000)
    .required()
    .error(new ApiError(400, 'Content must be between 1 and 1000 characters')),
})

export const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body)
  if (error) return next(error)
  next()
}

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body)
  if (error) return next(error)
  next()
}

export const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body)
  if (error) return next(error)
  next()
}