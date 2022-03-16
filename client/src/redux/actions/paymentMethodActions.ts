import { Dispatch } from 'redux'
import { IPaymentMethod, ISetPaymentMethodType, SET_PAYMENT_METHOD } from './../types/paymentMethodTypes'

export const setCheckoutPayment = (paymentData: IPaymentMethod) => (dispatch: Dispatch<ISetPaymentMethodType>) => {
  dispatch({
    type: SET_PAYMENT_METHOD,
    payload: paymentData
  })

  localStorage.setItem('sneakershub_payment', JSON.stringify(paymentData))
}