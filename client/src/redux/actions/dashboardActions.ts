import { Dispatch } from 'redux'
import { IAlertType, ALERT } from './../types/alertTypes'
import { GET_DASHBOARD_DATA, IGetDashboardDataType } from './../types/dashboardTypes'
import { getDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const getDashboardData = (token: string) => async(dispatch: Dispatch<IGetDashboardDataType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('dashboard', accessToken)
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res.data
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