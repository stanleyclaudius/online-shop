import mongoose from 'mongoose'

const checkoutSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true
  },
  recipientPhone: {
    type: String,
    required: true
  },
  recipientEmail: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  expedition: {
    type: String,
    required: true
  },
  expeditionService: {
    type: String,
    required: true
  },
  expeditionFee: {
    type: Number,
    required: true
  },
  estimatedDay: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  nameOnCard: {
    type: String
  },
  cardNumber: {
    type: String
  },
  expireMonth: {
    type: String
  },
  expireYear: {
    type: String
  },
  cvv: {
    type: Number
  },
  ovoPhoneNumber: {
    type: String
  },
  discount: {
    code: {
      type: String
    },
    value: {
      type: Number
    }
  },
  items: [
    {
      qty: Number,
      color: String,
      size: Number,
      discount: Number,
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'HAVEN\'T PAID'
  },
  chargeId: String
})

export default mongoose.model('checkout', checkoutSchema)