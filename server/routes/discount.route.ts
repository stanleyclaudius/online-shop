import express from 'express'
import discountCtrl from './../controllers/discountCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, authorizeRoles('admin'), discountCtrl.getDiscount)
  .post(isAuthenticated, authorizeRoles('admin'), discountCtrl.createDiscount)

router.route('/:id')
  .get(discountCtrl.getDiscountById)
  .patch(isAuthenticated, authorizeRoles('admin'), discountCtrl.updateDiscount)
  .delete(isAuthenticated, authorizeRoles('admin'), discountCtrl.deleteDiscount)

export default router