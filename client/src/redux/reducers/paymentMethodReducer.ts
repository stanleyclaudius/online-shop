import { IPaymentMethod, ISetPaymentMethodType, SET_PAYMENT_METHOD } from './../types/paymentMethodTypes'

const initialState = {
  nameOnCard: '',
  cardNumber: '',
  expireMonth: '',
  expireYear: '',
  cvv: '',
  phoneNumber: '',
  paymentMethod: ''
}

const paymentMethodReducer = (state: IPaymentMethod = initialState, action: ISetPaymentMethodType) => {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return action.payload
    default:
      return state
  }
}

export default paymentMethodReducer