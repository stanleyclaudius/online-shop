import { Dispatch } from 'redux'
import { CREATE_SUBSCRIBER, DELETE_SUBSCRIBER, GET_SUBSCRIBER, ICreateSubscriberType, IDeleteSubscriberType, IGetSubscriberType } from './../types/subscriberTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { deleteDataAPI, getDataAPI, postDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const getSubscriber = (token: string, page: number) => async(dispatch: Dispatch<IGetSubscriberType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`subscriber?page=${page}`, accessToken)
    dispatch({
      type: GET_SUBSCRIBER,
      payload: {
        data: res.data.subscribers,
        totalPage: res.data.totalPage
      }
    })

    dispatch({
      type: ALERT,
      payload: {}
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

export const createSubscriber = (email: string) => async(dispatch: Dispatch<ICreateSubscriberType | IAlertType>) => {
  try {
    const res = await postDataAPI('subscriber', { email })
    dispatch({
      type: CREATE_SUBSCRIBER,
      payload: res.data.subscriber
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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

export const deleteSubscriber = (id: string, token: string) => async(dispatch: Dispatch<IDeleteSubscriberType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await deleteDataAPI(`subscriber/${id}`, accessToken)
    dispatch({
      type: DELETE_SUBSCRIBER,
      payload: id
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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