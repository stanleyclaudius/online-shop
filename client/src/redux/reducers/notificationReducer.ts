import { CREATE_NOTIFICATION, GET_NOTIFICATION, ICreateNotificationType, IGetNotificationType, INotificationData, IReadNotificationType, READ_NOTIFICATION } from './../types/notificationTypes'

const notificationReducer = (state: INotificationData[] = [], action: ICreateNotificationType | IGetNotificationType | IReadNotificationType) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return [action.payload, ...state]
    case GET_NOTIFICATION:
      return action.payload
    case READ_NOTIFICATION:
      return state.map(item => item._id === action.payload ? { ...item, isRead: true } : item)
    default:
      return state
  }
}

export default notificationReducer