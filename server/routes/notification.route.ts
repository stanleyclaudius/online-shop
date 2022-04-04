import express from 'express'
import notificationCtrl from './../controllers/notificationCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .post(isAuthenticated, notificationCtrl.createNotification)
  .get(isAuthenticated, notificationCtrl.getNotification)

export default router