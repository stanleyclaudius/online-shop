import { IPaymentMethod, IResetPaymentMethodType, ISetPaymentMethodType, RESET_PAYMENT_METHOD, SET_PAYMENT_METHOD } from './../types/paymentMethodTypes'

const initialState = {
  nameOnCard: '',
  cardNumber: '',
  expireMonth: '',
  expireYear: '',
  cvv: '',
  phoneNumber: '',
  paymentMethod: ''
}

const paymentMethodReducer = (state: IPaymentMethod = initialState, action:IResetPaymentMethodType | ISetPaymentMethodType) => {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return action.payload
    case RESET_PAYMENT_METHOD:
      return {
        nameOnCard: '',
        cardNumber: '',
        expireMonth: '',
        expireYear: '',
        cvv: '',
        phoneNumber: '',
        paymentMethod: ''
      }
    default:
      return state
  }
}

export default paymentMethodReducer