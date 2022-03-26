import express from 'express'
import brandCtrl from './../controllers/brandCtrl'
import { authorizeRoles, isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(brandCtrl.getBrand)
  .post(isAuthenticated, authorizeRoles('admin'), brandCtrl.createBrand)

router.route('/admin').get(isAuthenticated, authorizeRoles('admin'), brandCtrl.getBrandAdmin)

router.route('/:id')
  .patch(isAuthenticated, authorizeRoles('admin'), brandCtrl.updateBrand)
  .delete(isAuthenticated, authorizeRoles('admin'), brandCtrl.deleteBrand)

export default router