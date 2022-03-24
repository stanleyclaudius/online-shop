import express from 'express'
import dashboardCtrl from './../controllers/dashboardCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/').get(dashboardCtrl.getDashboardData)

export default router