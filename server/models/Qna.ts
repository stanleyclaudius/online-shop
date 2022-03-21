import mongoose from 'mongoose'

const qnaSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  reply: {
    type: mongoose.Types.ObjectId,
    ref: 'comment'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'product'
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  ]
}, {
  timestamps: true
})

export default mongoose.model('qna', qnaSchema)