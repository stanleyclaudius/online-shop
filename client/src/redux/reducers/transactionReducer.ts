import { ITransaction, IGetAllTransactionsType, GET_ALL_TRANSACTIONS } from './../types/transactionTypes'

const initialState = {
  data: []
}

const transactionReducer = (state: ITransaction = initialState, action: IGetAllTransactionsType) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default transactionReducer