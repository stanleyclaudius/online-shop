import express from 'express'
import cartCtrl from './../controllers/cartCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, cartCtrl.getCart)
  .post(isAuthenticated, cartCtrl.addToCart)

router.route('/:productId/:productColor/:productSize').delete(isAuthenticated, cartCtrl.deleteCart)

export default router