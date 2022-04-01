import express from 'express'
import categoryCtrl from './../controllers/categoryCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(categoryCtrl.getCategory)
  .post(isAuthenticated, authorizeRoles('admin'), categoryCtrl.createCategory)

router.route('/home').get(categoryCtrl.getHomeCategory)

router.route('/admin').get(isAuthenticated, authorizeRoles('admin'), categoryCtrl.getAdminCategory)

router.route('/:id')
  .patch(isAuthenticated, authorizeRoles('admin'), categoryCtrl.updateCategory)
  .delete(isAuthenticated, authorizeRoles('admin'), categoryCtrl.deleteCategory)

export default router