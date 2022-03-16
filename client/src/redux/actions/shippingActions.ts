import { Dispatch } from 'redux'
import { ISetShippingType, IShipping, SET_SHIPPING } from './../types/shippingTypes'

export const setShipping = (shippingData: IShipping) => (dispatch: Dispatch<ISetShippingType>) => {
  dispatch({
    type: SET_SHIPPING,
    payload: shippingData
  })

  localStorage.setItem('sneakershub_shipping', JSON.stringify(shippingData))
}