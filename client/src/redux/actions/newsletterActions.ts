import { Dispatch } from 'redux'
import { IGetNewslettersType, ICreateNewsletterType, INewsletterData, GET_NEWSLETTERS, CREATE_NEWSLETTER } from './../types/newsletterTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from './../../utils/checkTokenExp'

export const getNewsletters = (token: string) => async(dispatch: Dispatch<IGetNewslettersType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('newsletter', accessToken)
    dispatch({
      type: GET_NEWSLETTERS,
      payload: {
        data: res.data.newsletters,
        totalPage: res.data.totalPage
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

export const createNewsletter = (data: INewsletterData, token: string) => async(dispatch: Dispatch<ICreateNewsletterType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    const res = await postDataAPI('newsletter', data, accessToken)
    dispatch({
      type: CREATE_NEWSLETTER,
      payload: res.data.newsletter
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