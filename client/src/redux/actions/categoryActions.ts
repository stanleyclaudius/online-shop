import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertType } from '../types/alertTypes'
import { ICreateCategoryType, ICategoryData, CREATE_CATEGORY, IGetCategoryType, GET_CATEGORY, IDeleteCategoryType, DELETE_CATEGORY, IUpdateCategoryType, UPDATE_CATEGORY } from './../types/categoryTypes'

export const createCategory = (categoryData: ICategoryData, token: string) => async(dispatch: Dispatch<ICreateCategoryType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await postDataAPI('category', categoryData, accessToken)
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data.category
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

export const getCategory = () => async(dispatch: Dispatch<IGetCategoryType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('category')
    dispatch({
      type: GET_CATEGORY,
      payload: res.data.categories
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

export const deleteCategory = (id: string, token: string) => async(dispatch: Dispatch<IDeleteCategoryType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await deleteDataAPI(`category/${id}`, accessToken)
    dispatch({
      type: DELETE_CATEGORY,
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

export const updateCategory = (categoryData: ICategoryData, token: string) => async(dispatch: Dispatch<IUpdateCategoryType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await patchDataAPI(`category/${categoryData._id}`, { name: categoryData.name }, accessToken)
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data.category
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