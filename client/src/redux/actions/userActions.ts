import { Dispatch } from 'redux'
import { IGetAllUserType, GET_ALL_USER } from './../types/userTypes'
import { getDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertType } from '../types/alertTypes'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const getAllUser = (token: string, page: number) => async(dispatch: Dispatch<IGetAllUserType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`user?page=${page}`, accessToken)
    dispatch({
      type: GET_ALL_USER,
      payload: {
        data: res.data.users,
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
      payload: err.response.data.msg
    })
  }
}