import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import connectDB from './config/db'
import routes from './routes'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { socketServer } from './config/socketServer'

dotenv.config({
  path: './server/config/.env'
})

const app = express()

const http = createServer(app)
export const io = new Server(http)

io.on('connection', (socket: Socket) => {
  socketServer(socket)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1/auth', routes.authRouter)
app.use('/api/v1/brand', routes.brandRouter)
app.use('/api/v1/category', routes.categoryRouter)
app.use('/api/v1/product', routes.productRouter)
app.use('/api/v1/cart', routes.cartRouter)
app.use('/api/v1/wishlist', routes.wishlistRouter)
app.use('/api/v1/courier', routes.courierRouter)
app.use('/api/v1/discount', routes.discountRouter)
app.use('/api/v1/checkout', routes.checkoutRouter)
app.use('/api/v1/review', routes.reviewRouter)
app.use('/api/v1/qna', routes.qnaRouter)
app.use('/api/v1/dashboard', routes.dashboardRouter)
app.use('/api/v1/user', routes.userRouter)
app.use('/api/v1/banner', routes.bannerRouter)
app.use('/api/v1/notification', routes.notificationRouter)

connectDB()
http.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}.`))