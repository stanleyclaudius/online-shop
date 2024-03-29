import { Dispatch } from 'redux'
import { GET_ALL_TRANSACTIONS, IGetAllTransactionsType } from './../types/transactionTypes'
import { getDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertType } from '../types/alertTypes'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const getAllTransactions = (token: string, page: number) => async(dispatch: Dispatch<IGetAllTransactionsType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`checkout/transaction?page=${page}`, accessToken)
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: {
        data: res.data.transactions,
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