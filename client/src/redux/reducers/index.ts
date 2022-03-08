import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import brandReducer from './brandReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  brand: brandReducer,
  category: categoryReducer
})