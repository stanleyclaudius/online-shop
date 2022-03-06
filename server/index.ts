import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import connectDB from './config/db'
import routes from './routes'

dotenv.config({
  path: './server/config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1/auth', routes.authRouter)

connectDB()
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}.`))