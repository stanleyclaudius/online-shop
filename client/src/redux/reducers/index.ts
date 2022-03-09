import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import brandReducer from './brandReducer'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'
import homeProductReducer from './homeProductReducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  brand: brandReducer,
  category: categoryReducer,
  product: productReducer,
  homeProduct: homeProductReducer
})