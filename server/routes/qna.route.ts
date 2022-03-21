import express from 'express'
import qnaCtrl from './../controllers/qnaCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, qnaCtrl.createQna)

router.route('/:product').get(qnaCtrl.getQna)

export default router