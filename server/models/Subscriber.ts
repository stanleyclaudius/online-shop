import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true
})

export default mongoose.model('subscriber', subscriberSchema)