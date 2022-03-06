import mongoose from 'mongoose'

const connectDB = async() => {
  await mongoose.connect(`${process.env.MONGO_URL}`, {
    autoIndex: false
  }, err => {
    if (err) throw err
    console.log('Successfully connect to MongoDB.')
  })
}

export default connectDB