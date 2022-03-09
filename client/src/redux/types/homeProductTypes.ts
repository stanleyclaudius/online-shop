import { IProductData } from './productTypes'

export const GET_HOME_PRODUCT = 'GET_HOME_PRODUCT'

export interface IHomeProductData {
  _id: string
  name: string
  count: number
  products: IProductData[]
}

export interface IHomeProduct {
  data: IHomeProductData[]
  maxPrice: number
  minPrice: number
}

export interface IGetHomeProductType {
  type: typeof GET_HOME_PRODUCT
  payload: IHomeProduct
}