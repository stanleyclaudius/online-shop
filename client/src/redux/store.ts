import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {
  cart: localStorage.getItem('sneakershub_cartItems') ? JSON.parse(localStorage.getItem('sneakershub_cartItems') as string) : [],
  wishlist: localStorage.getItem('sneakershub_wishlist') ? JSON.parse(localStorage.getItem('sneakershub_wishlist') as string) : []
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store