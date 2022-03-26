import { Dispatch } from 'redux'
import { ALERT, IAlertType } from './../types/alertTypes'
import { checkTokenExp } from './../../utils/checkTokenExp'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import {
  GET_BRAND,
  CREATE_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
  IBrandData,
  IGetBrandType,
  ICreateBrandType,
  IUpdateBrandType,
  IDeleteBrandType,
} from './../types/brandTypes'

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
      payload: {
        data: res.data.brands,
        totalPage: 0
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

export const getAdminBrand = (token: string, page: number) => async(dispatch: Dispatch<IGetBrandType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`brand/admin?page=${page}`, accessToken)
    dispatch({
      type: GET_BRAND,
      payload: {
        totalPage: res.data.totalPage,
        data: res.data.brands
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