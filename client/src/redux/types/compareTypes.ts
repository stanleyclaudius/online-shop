import { IProductData } from './productTypes'

export const OPEN_COMPARE_MODAL = 'OPEN_COMPARE_MODAL'
export const SET_COMPARE_DATA = 'SET_COMPARE_DATA'

export interface ICompare {
  data: IProductData
  isOpen: boolean
}

export interface ISetCompareType {
  type: typeof SET_COMPARE_DATA
  payload: IProductData
}

export interface IOpenCompareModalType {
  type: typeof OPEN_COMPARE_MODAL
  payload: boolean
}