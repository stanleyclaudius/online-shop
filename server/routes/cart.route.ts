import express from 'express'
import cartCtrl from './../controllers/cartCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, cartCtrl.getCart)
  .post(isAuthenticated, cartCtrl.addToCart)

export default router