import { Dispatch } from 'redux'
import { checkTokenExp } from './../../utils/checkTokenExp'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertType } from './../types/alertTypes'
import { CREATE_QNA, GET_QNA, ICreateQnaType, IGetQnaType, IQnaData } from './../types/qnaTypes'

export const createQna = (qnaData: IQnaData, token: string) => async(dispatch: Dispatch<ICreateQnaType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    const res = await postDataAPI('qna', qnaData, accessToken)
    dispatch({
      type: CREATE_QNA,
      payload: {
        ...res.data.qna,
        user: qnaData.user
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