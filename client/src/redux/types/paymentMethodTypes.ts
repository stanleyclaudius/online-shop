export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD'
export const RESET_PAYMENT_METHOD = 'RESET_PAYMENT_METHOD'

export interface IPaymentMethod {
  phoneNumber: string
}

export interface ISetPaymentMethodType {
  type: typeof SET_PAYMENT_METHOD
  payload: IPaymentMethod
}

export interface IResetPaymentMethodType {
  type: typeof RESET_PAYMENT_METHOD
  payload: IPaymentMethod
}