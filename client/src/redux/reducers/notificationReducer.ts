import { CREATE_NOTIFICATION, GET_NOTIFICATION, ICreateNotificationType, IGetNotificationType, INotificationData } from './../types/notificationTypes'

const notificationReducer = (state: INotificationData[] = [], action: ICreateNotificationType | IGetNotificationType) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return [action.payload, ...state]
    case GET_NOTIFICATION:
      return action.payload
    default:
      return state
  }
}

export default notificationReducer