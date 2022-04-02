import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertType } from '../types/alertTypes'
import { GET_REVIEW, ICreateReviewType, IGetReviewType, ILikeReviewType, IReviewData, IUnlikeReviewType } from './../types/reviewTypes'

export const getReview = (id: string, page: number = 1) => async(dispatch: Dispatch<IGetReviewType | IAlertType>) => {
  try {
    const res = await getDataAPI(`review/${id}?page=${page}`)
    dispatch({
      type: GET_REVIEW,
      payload: res.data
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

export const createReview = (reviewData: IReviewData, token: string) => async(dispatch: Dispatch<ICreateReviewType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await postDataAPI('review', reviewData, accessToken)

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

export const likeReview = (id: string, product: string, token: string) => async(dispatch: Dispatch<ILikeReviewType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    await patchDataAPI(`review/like/${id}`, { product }, accessToken)
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const unlikeReview = (id: string, product: string, token: string) => async(dispatch: Dispatch<IUnlikeReviewType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    await patchDataAPI(`review/unlike/${id}`, { product }, accessToken)
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}