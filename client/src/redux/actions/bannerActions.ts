import { Dispatch } from 'redux'
import { GET_BANNER, IGetBannerType, IUpdateBannerType, UPDATE_BANNER } from './../types/bannerTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { getDataAPI, patchDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const getBanner = () => async(dispatch: Dispatch<IAlertType | IGetBannerType>) => {
  try {
    const res = await getDataAPI('banner')
    dispatch({
      type: GET_BANNER,
      payload: res.data.banner
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

export const updateBanner = (bannerId: string, productId: string, token: string) => async(dispatch: Dispatch<IUpdateBannerType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await patchDataAPI(`banner/${bannerId}`, { product: productId }, accessToken)
    dispatch({
      type: UPDATE_BANNER,
      payload: res.data.banner
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