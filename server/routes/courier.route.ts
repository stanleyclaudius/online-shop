import express from 'express'
import courierCtrl from './../controllers/courierCtrl'

const router = express.Router()

router.route('/province').get(courierCtrl.getProvince)
router.route('/cost').post(courierCtrl.getCost)

router.route('/province/:id').get(courierCtrl.getProvinceById)
router.route('/city/:province').get(courierCtrl.getCity)
router.route('/city/detail/:id').get(courierCtrl.getCityById)

export default router