import express from 'express'
import cartCtrl from './../controllers/cartCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, cartCtrl.addToCart)

export default router