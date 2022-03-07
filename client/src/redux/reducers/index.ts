import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import brandReducer from './brandReducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  brand: brandReducer
})