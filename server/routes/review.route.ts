import express from 'express'
import reviewCtrl from './../controllers/reviewCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .post(isAuthenticated, reviewCtrl.createReview)

router.route('/check/:product')
  .get(isAuthenticated, reviewCtrl.checkReviewEligibility)

router.route('/like/:id').patch(isAuthenticated, reviewCtrl.likeReview)
router.route('/unlike/:id').patch(isAuthenticated, reviewCtrl.unlikeReview)

router.route('/rating/:product').get(reviewCtrl.getproductRating)

router.route('/:product').get(reviewCtrl.getReview)

export default router