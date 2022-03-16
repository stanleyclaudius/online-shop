import express from 'express'
import checkoutCtrl from './../controllers/checkoutCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, checkoutCtrl.createCheckout)

export default router