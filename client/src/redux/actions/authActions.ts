import { Dispatch } from 'redux'
import { IUserLogin } from './../../utils/Interface'
import { postDataAPI } from './../../utils/fetchData'
import { AUTH, IAuthType } from './../types/authTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const login = (userData: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/login', userData)
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })
    localStorage.setItem('sneakershub_firstLogin', 'true')

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

export const logout = (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const tokenExpRes = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpRes ? tokenExpRes : token

  try {
    const res = await postDataAPI('auth/logout', {}, accessToken)
    dispatch({
      type: AUTH,
      payload: {}
    })
    localStorage.removeItem('sneakershub_firstLogin')

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