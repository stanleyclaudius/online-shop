export const SET_RECIPIENT = 'SET_RECIPIENT'

export interface IRecipient {
  recipientName: string
  recipientPhone: string
  recipientEmail: string
}

export interface ISetRecipientType {
  type: typeof SET_RECIPIENT
  payload: IRecipient
}