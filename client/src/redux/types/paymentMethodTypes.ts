export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD'

export interface IPaymentMethod {
  nameOnCard: string
  cardNumber: string
  expireMonth: string
  expireYear: string
  cvv: string
  phoneNumber: string
  paymentMethod: string
}

export interface ISetPaymentMethodType {
  type: typeof SET_PAYMENT_METHOD
  payload: IPaymentMethod
}