import { IRecipient, IResetRecipientType, ISetRecipientType, RESET_RECIPIENT, SET_RECIPIENT } from './../types/recipientTypes'

const initialState = {
  recipientName: '',
  recipientPhone: '',
  recipientEmail: ''
}

const recipientReducer = (state: IRecipient = initialState, action:IResetRecipientType | ISetRecipientType) => {
  switch (action.type) {
    case SET_RECIPIENT:
      return action.payload
    case RESET_RECIPIENT:
      return {
        recipientName: '',
        recipientPhone: '',
        recipientEmail: ''
      }
    default:
      return state
  }
}

export default recipientReducer