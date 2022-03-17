import {
  CREATE_CHECKOUT,
  ICheckout,
  ICreateCheckoutType
} from './../types/checkoutTypes'

const initialState = {
  data: []
}

const checkoutReducer = (state: ICheckout = initialState, action: ICreateCheckoutType) => {
  switch (action.type) {
    case CREATE_CHECKOUT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    default:
      return state
  }
}

export default checkoutReducer