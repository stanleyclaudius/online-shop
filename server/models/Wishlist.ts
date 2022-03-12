import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'product'
  }
}, {
  timestamps: true
})

export default mongoose.model('wishlist', wishlistSchema)