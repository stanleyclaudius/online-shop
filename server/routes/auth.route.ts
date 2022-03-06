import express from 'express'
import authCtrl from './../controllers/authCtrl';

const router = express.Router()

router.route('/register').post(authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)

export default router