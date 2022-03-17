export const SET_RECIPIENT = 'SET_RECIPIENT'
export const RESET_RECIPIENT = 'RESET_RECIPIENT'

export interface IRecipient {
  recipientName: string
  recipientPhone: string
  recipientEmail: string
}

export interface ISetRecipientType {
  type: typeof SET_RECIPIENT
  payload: IRecipient
}

export interface IResetRecipientType {
  type: typeof RESET_RECIPIENT
  payload: IRecipient
}