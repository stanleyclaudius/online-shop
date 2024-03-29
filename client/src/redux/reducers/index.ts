import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import brandReducer from './brandReducer'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'
import homeProductReducer from './homeProductReducer'
import homeCategoryReducer from './homeCategoryReducer'
import cartReducer from './cartReducer'
import wishlistReducer from './wishlistReducer'
import compareReducer from './compareReducer'
import recipientReducer from './recipientReducer'
import shippingReducer from './shippingReducer'
import paymentMethodReducer from './paymentMethodReducer'
import discountReducer from './discountReducer'
import checkoutReducer from './checkoutReducer'
import reviewReducer from './reviewReducer'
import qnaReducer from './qnaReducer'
import dashboardReducer from './dashboardReducer'
import userReducer from './userReducer'
import transactionReducer from './transactionReducer'
import bannerReducer from './bannerReducer'
import socketReducer from './socketReducer'
import notificationReducer from './notificationReducer'
import subscriberReducer from './subscriberReducer'
import newsletterReducer from './newsletterReducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  brand: brandReducer,
  category: categoryReducer,
  product: productReducer,
  homeProduct: homeProductReducer,
  homeCategory: homeCategoryReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  recipient: recipientReducer,
  shipping: shippingReducer,
  paymentMethod: paymentMethodReducer,
  discount: discountReducer,
  checkout: checkoutReducer,
  review: reviewReducer,
  qna: qnaReducer,
  dashboard: dashboardReducer,
  user: userReducer,
  transaction: transactionReducer,
  banner: bannerReducer,
  socket: socketReducer,
  notification: notificationReducer,
  subscriber: subscriberReducer,
  newsletter: newsletterReducer
})