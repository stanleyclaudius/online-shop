import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'product'
  }
}, {
  timestamps: true
})

export default mongoose.model('banner', bannerSchema)