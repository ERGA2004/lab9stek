import Post from '../models/Post.model.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body
  const post = await Post.create({content: content, author: req.user._id})
  res.status(201).json(post)
})

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'username')
    .populate('likes', 'username')
    .sort({ createdAt: -1 })

  res.json(posts)
})

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user._id })
    .populate('author', 'username')
    .populate('likes', 'username')
    .sort({ createdAt: -1 })

  res.json(posts)
})

const updatePost = asyncHandler(async (req, res) => {
  const { content } = req.body
  const post = await Post.findById(req.params.id)

  if (!post) throw new ApiError(404, 'Post not found')
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to edit this post')
  }

  post.content = content
  await post.save()
  res.json(post)
})

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) throw new ApiError(404, 'Post not found')
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to delete this post')
  }

  await post.deleteOne()
  res.json({ message: 'Post deleted successfully' })
})

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) throw new ApiError(404, 'Post not found')

  const userId = req.user._id
  const likeIndex = post.likes.indexOf(userId)

  if (likeIndex === -1) {
    post.likes.push(userId)
  } else {
    post.likes.splice(likeIndex, 1)
  }

  await post.save()
  res.json(post)
})

export {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
  toggleLike
}