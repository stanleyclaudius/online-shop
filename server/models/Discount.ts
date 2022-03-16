import mongoose from 'mongoose'

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 4
  },
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('discount', discountSchema)