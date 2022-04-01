import express from 'express'
import bannerCtrl from './../controllers/bannerCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/').get(bannerCtrl.getBanner)

router.route('/:id').patch(isAuthenticated, authorizeRoles('admin'), bannerCtrl.updateBanner)

export default router