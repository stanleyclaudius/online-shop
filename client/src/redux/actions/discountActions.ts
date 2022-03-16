import { Dispatch } from 'redux'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertType } from './../types/alertTypes'
import { checkTokenExp } from './../../utils/checkTokenExp'
import {
  GET_DISCOUNTS,
  CREATE_DISCOUNT,
  UPDATE_DISCOUNT,
  DELETE_DISCOUNT,
  IDiscountData,
  IGetDiscountsType,
  ICreateDiscountType,
  IUpdateDiscountType,
  IDeleteDiscountType
} from './../types/discountTypes'

export const createDiscount = (discountData: IDiscountData, token: string) => async(dispatch: Dispatch<ICreateDiscountType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await postDataAPI('discount', discountData, accessToken)
    dispatch({
      type: CREATE_DISCOUNT,
      payload: res.data.discount
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

export const getDiscount = (token: string) => async(dispatch: Dispatch<IGetDiscountsType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('discount', accessToken)
    dispatch({
      type: GET_DISCOUNTS,
      payload: res.data.discounts
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

export const updateDiscount = (discountData: IDiscountData, token: string) => async(dispatch: Dispatch<IUpdateDiscountType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await patchDataAPI(`discount/${discountData._id}`, discountData, accessToken)
    dispatch({
      type: UPDATE_DISCOUNT,
      payload: res.data.discount
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

export const deleteDiscount = (id: string, token: string) => async(dispatch: Dispatch<IDeleteDiscountType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await deleteDataAPI(`discount/${id}`, accessToken)
    dispatch({
      type: DELETE_DISCOUNT,
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