import { Dispatch } from 'redux'
import { ALERT, IAlertType } from './../types/alertTypes'
import { CREATE_BRAND, IBrandData, ICreateBrandType } from './../types/brandTypes'
import { postDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const createBrand = (brandData: IBrandData, token: string) => async(dispatch: Dispatch<ICreateBrandType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await postDataAPI('brand', brandData, accessToken)
    dispatch({
      type: CREATE_BRAND,
      payload: res.data.brand
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