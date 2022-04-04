export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const GET_NOTIFICATION = 'GET_NOTIFICATION'
export const READ_NOTIFICATION = 'READ_NOTIFICATION'

export interface INotificationData {
  _id?: string
  transaction: string
  message: string
  isRead?: boolean
}

export interface ICreateNotificationType {
  type: typeof CREATE_NOTIFICATION
  payload: INotificationData
}

export interface IGetNotificationType {
  type: typeof GET_NOTIFICATION
  payload: INotificationData[]
}

export interface IReadNotificationType {
  type: typeof READ_NOTIFICATION
  payload: string
}