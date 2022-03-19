import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertType } from '../types/alertTypes'
import { CREATE_REVIEW, GET_REVIEW, ICreateReviewType, IGetReviewType, IReviewData } from './../types/reviewTypes'

export const getReview = (id: string) => async(dispatch: Dispatch<IGetReviewType | IAlertType>) => {
  try {
    const res = await getDataAPI(`review/${id}`)
    dispatch({
      type: GET_REVIEW,
      payload: res.data.reviews
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
      type: CREATE_REVIEW,
      payload: {
        ...res.data.review,
        user: reviewData.user
      }
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