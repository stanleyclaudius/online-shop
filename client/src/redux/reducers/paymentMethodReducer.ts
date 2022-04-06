import { IPaymentMethod, IResetPaymentMethodType, ISetPaymentMethodType, RESET_PAYMENT_METHOD, SET_PAYMENT_METHOD } from './../types/paymentMethodTypes'

const initialState = {
  phoneNumber: '',
}

const paymentMethodReducer = (state: IPaymentMethod = initialState, action:IResetPaymentMethodType | ISetPaymentMethodType) => {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return action.payload
    case RESET_PAYMENT_METHOD:
      return {
        phoneNumber: '',
      }
    default:
      return state
  }
}

export default paymentMethodReducer