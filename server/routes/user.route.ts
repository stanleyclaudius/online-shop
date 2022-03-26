import express from 'express'
import userCtrl from './../controllers/userCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/').get(isAuthenticated, authorizeRoles('admin'), userCtrl.getAllUser)

export default router