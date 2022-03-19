import express from 'express'
import reviewCtrl from './../controllers/reviewCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .post(isAuthenticated, reviewCtrl.createReview)

router.route('/check/:product')
  .get(isAuthenticated, reviewCtrl.checkReviewEligibility)

router.route('/:product').get(reviewCtrl.getReview)

export default router