import {
  CREATE_CHECKOUT,
  GET_CHECKOUT_HISTORY,
  ICheckout,
  ICreateCheckoutType,
  IGetCheckoutHistoryType
} from './../types/checkoutTypes'

const initialState = {
  data: []
}

const checkoutReducer = (state: ICheckout = initialState, action:IGetCheckoutHistoryType | ICreateCheckoutType) => {
  switch (action.type) {
    case CREATE_CHECKOUT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_CHECKOUT_HISTORY:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default checkoutReducer