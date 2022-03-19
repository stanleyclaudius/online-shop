import express from 'express'
import reviewCtrl from './../controllers/reviewCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .post(isAuthenticated, reviewCtrl.createReview)

router.route('/:product')
  .get(isAuthenticated, reviewCtrl.checkReviewEligibility)

export default router