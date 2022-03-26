import { ICheckoutData } from "./checkoutTypes";

export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS'

export interface ITransaction {
  totalPage: number
  data: ICheckoutData[]
}

export interface IGetAllTransactionsType {
  type: typeof GET_ALL_TRANSACTIONS
  payload: ITransaction
}