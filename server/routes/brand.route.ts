import express from 'express'
import brandCtrl from './../controllers/brandCtrl'
import { authorizeRoles, isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, authorizeRoles('admin'), brandCtrl.createBrand)

export default router