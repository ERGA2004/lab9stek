import express from 'express'
import {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
  toggleLike,
} from '../controllers/post.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { checkPostOwnership } from '../middleware/auth.middleware.js'
import { validatePost } from '../middleware/validate.js'

const router = express.Router()

router.post('/', protect, validatePost, createPost)
router.get('/', getAllPosts)
router.get('/my', protect, getMyPosts)
router.patch('/:id', protect, checkPostOwnership, validatePost, updatePost)
router.delete('/:id', protect, checkPostOwnership, deletePost)
router.post('/:id/like', protect, toggleLike)

export default router