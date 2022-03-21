import express from 'express'
import qnaCtrl from './../controllers/qnaCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, qnaCtrl.createQna)

router.route('/:product').get(qnaCtrl.getQna)

router.route('/like/:id').patch(isAuthenticated, qnaCtrl.likeQna)
router.route('/unlike/:id').patch(isAuthenticated, qnaCtrl.unlikeQna)

export default router