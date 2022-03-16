import { Dispatch } from 'redux'
import { IRecipient, ISetRecipientType, SET_RECIPIENT } from './../types/recipientTypes'

export const setRecipient = (recipientData: IRecipient) => (dispatch: Dispatch<ISetRecipientType>) => {
  dispatch({
    type: SET_RECIPIENT,
    payload: recipientData
  })

  localStorage.setItem('sneakershub_recipient', JSON.stringify(recipientData))
}