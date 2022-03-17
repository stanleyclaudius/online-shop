import { Dispatch } from 'redux'
import { CREATE_CHECKOUT, ICheckoutData, ICreateCheckoutType } from './../types/checkoutTypes'
import { postDataAPI } from './../../utils/fetchData'
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