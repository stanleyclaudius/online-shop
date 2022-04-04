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
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.model('notification', notificationSchema)