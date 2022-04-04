import { Dispatch } from 'redux'
import { CREATE_NOTIFICATION, GET_NOTIFICATION, ICreateNotificationType, IGetNotificationType, INotificationData, IReadNotificationType, READ_NOTIFICATION } from './../types/notificationTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const createNotification = (data: INotificationData, token: string) => async(dispatch: Dispatch<ICreateNotificationType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await postDataAPI('notification', data, accessToken)
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: res.data.notification
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const getNotification = (token: string) => async(dispatch: Dispatch<IGetNotificationType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await getDataAPI('notification', accessToken)
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data.notifications
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const readNotification = (id: string, token: string) => async(dispatch: Dispatch<IReadNotificationType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    await patchDataAPI(`notification/${id}`, {}, accessToken)
    dispatch({
      type: READ_NOTIFICATION,
      payload: id
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}