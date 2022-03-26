import { ICheckoutData } from "./checkoutTypes";

export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS'

export interface ITransaction {
  data: ICheckoutData[]
}

export interface IGetAllTransactionsType {
  type: typeof GET_ALL_TRANSACTIONS
  payload: ICheckoutData[]
}