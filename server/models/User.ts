import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  role: {
    type: String,
    default: 'user'
  },
  type: {
    type: String,
    default: 'register'
  },
  rf_token: {
    type: String,
    select: false
  },
  province: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  district: {
    type: String,
    default: ''
  },
  postalCode: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  }
})

export default mongoose.model('user', userSchema)