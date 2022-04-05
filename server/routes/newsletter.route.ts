import express from 'express'
import newsletterCtrl from './../controllers/newsletterCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, authorizeRoles('admin'), newsletterCtrl.getNewsletters)
  .post(isAuthenticated, authorizeRoles('admin'), newsletterCtrl.composeNewsletter)

router.route('/:id').get(isAuthenticated, authorizeRoles('admin'), newsletterCtrl.getNewsletterById)

export default router