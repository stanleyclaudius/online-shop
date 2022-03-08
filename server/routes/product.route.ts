import express from 'express'
import productCtrl from '../controllers/productCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(productCtrl.getProduct)
  .post(isAuthenticated, authorizeRoles('admin'), productCtrl.createProduct)

router.route('/:id')
  .delete(isAuthenticated, authorizeRoles('admin'), productCtrl.deleteProduct)

export default router