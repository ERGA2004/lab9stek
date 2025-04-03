import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [1, 'Content must be at least 1 character long'],
      maxlength: [1000, 'Content cannot exceed 1000 characters'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)
export default Post