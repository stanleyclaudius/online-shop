import express from 'express'
import { isAuthenticated } from './../middlewares/auth';
import authCtrl from './../controllers/authCtrl';

const router = express.Router()

router.route('/register').post(authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)
router.route('/login').post(authCtrl.login)
router.route('/logout').post(isAuthenticated, authCtrl.logout)
router.route('/refresh_token').post(authCtrl.refreshToken)
router.route('/google_login').post(authCtrl.googleLogin)
router.route('/facebook_login').post(authCtrl.facebookLogin)

export default router