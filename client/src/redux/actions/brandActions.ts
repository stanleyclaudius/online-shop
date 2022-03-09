import { Dispatch } from 'redux'
import { ALERT, IAlertType } from './../types/alertTypes'
import { GET_BRAND, CREATE_BRAND, IBrandData, IGetBrandType, ICreateBrandType, IDeleteBrandType, DELETE_BRAND, IUpdateBrandType, UPDATE_BRAND } from './../types/brandTypes'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
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

export const getBrand = () => async(dispatch: Dispatch<IGetBrandType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('brand')
    dispatch({
      type: GET_BRAND,
      payload: res.data.brands
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

export const deleteBrand = (id: string, token: string) => async(dispatch: Dispatch<IDeleteBrandType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await deleteDataAPI(`brand/${id}`, accessToken)
    dispatch({
      type: DELETE_BRAND,
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

export const updateBrand = (brandData: IBrandData, token: string) => async(dispatch: Dispatch<IUpdateBrandType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await patchDataAPI(`brand/${brandData._id}`, { name: brandData.name }, accessToken)
    dispatch({
      type: UPDATE_BRAND,
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