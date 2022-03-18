import express from 'express'
import checkoutCtrl from './../controllers/checkoutCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, checkoutCtrl.getCheckoutHistory)
  .post(isAuthenticated, checkoutCtrl.createCheckout)

router.route('/status/:id').get(isAuthenticated, checkoutCtrl.getPaymentStatus)


export default router