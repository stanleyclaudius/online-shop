import express from 'express'
import productCtrl from '../controllers/productCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, authorizeRoles('admin'), productCtrl.createProduct)

export default router