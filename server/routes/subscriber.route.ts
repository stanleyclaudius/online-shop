import express from 'express'
import subscriberCtrl from './../controllers/subscriberCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, authorizeRoles('admin'), subscriberCtrl.getSubscriber)
  .post(subscriberCtrl.createSubscriber)

router.route('/:id').delete(isAuthenticated, authorizeRoles('admin'), subscriberCtrl.deleteSubscriber)

export default router