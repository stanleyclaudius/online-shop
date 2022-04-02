import { Dispatch } from 'redux'
import { checkTokenExp } from './../../utils/checkTokenExp'
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertType } from './../types/alertTypes'
import { GET_QNA, ICreateQnaType, IGetQnaType, ILikeQnaType, IQnaData, IUnlikeQnaType } from './../types/qnaTypes'

export const createQna = (qnaData: IQnaData, token: string) => async(dispatch: Dispatch<ICreateQnaType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    await postDataAPI('qna', qnaData, accessToken)
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const getQna = (id: string) => async(dispatch: Dispatch<IGetQnaType | IAlertType>) => {
  try {
    const res = await getDataAPI(`qna/${id}`)
    dispatch({
      type: GET_QNA,
      payload: res.data.qnas
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

export const likeQna = (id: string, product: string, token: string) => async(dispatch: Dispatch<ILikeQnaType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    await patchDataAPI(`qna/like/${id}`, { product }, accessToken)
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const unlikeQna = (id: string, product: string, token: string) => async(dispatch: Dispatch<IUnlikeQnaType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    await patchDataAPI(`qna/unlike/${id}`, { product }, accessToken)
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}