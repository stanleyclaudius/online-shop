import express from 'express'
import wishlistCtrl from './../controllers/wishlistCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, wishlistCtrl.getWishlist)
  .post(isAuthenticated, wishlistCtrl.createWishlist)

router.route('/:id').delete(isAuthenticated, wishlistCtrl.deleteWishlist)

export default router