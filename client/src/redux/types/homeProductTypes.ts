import { IProductData } from './productTypes'
export const GET_HOME_PRODUCT = 'GET_HOME_PRODUCT'

export interface IHomeProduct {
  data: IProductData[]
  maxPrice: number
  minPrice: number
}

export interface IGetHomeProductType {
  type: typeof GET_HOME_PRODUCT
  payload: IHomeProduct
}