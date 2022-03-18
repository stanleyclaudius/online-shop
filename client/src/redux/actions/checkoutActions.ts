import { Dispatch } from 'redux'
import { CREATE_CHECKOUT, GET_CHECKOUT_HISTORY, ICheckoutData, ICreateCheckoutType, IGetCheckoutHistoryType } from './../types/checkoutTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertType } from './../types/alertTypes'
import { checkTokenExp } from './../../utils/checkTokenExp'

export const checkoutCart = (checkoutData: ICheckoutData, token: string) => async(dispatch: Dispatch<ICreateCheckoutType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('checkout', checkoutData, accessToken)
    dispatch({
      type: CREATE_CHECKOUT,
      payload: res.data.checkout
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

export const getCheckoutHistory = (token: string) => async(dispatch: Dispatch<IGetCheckoutHistoryType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('checkout', accessToken)
    dispatch({
      type: GET_CHECKOUT_HISTORY,
      payload: res.data.checkouts
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