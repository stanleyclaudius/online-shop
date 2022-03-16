import { IRecipient, ISetRecipientType, SET_RECIPIENT } from './../types/recipientTypes'

const initialState = {
  recipientName: '',
  recipientPhone: '',
  recipientEmail: ''
}

const recipientReducer = (state: IRecipient = initialState, action: ISetRecipientType) => {
  switch (action.type) {
    case SET_RECIPIENT:
      return action.payload
    default:
      return state
  }
}

export default recipientReducer