import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'product'
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('cart', cartSchema)