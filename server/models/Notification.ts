import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Types.ObjectId,
    ref: 'checkout'
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.model('notification', notificationSchema)