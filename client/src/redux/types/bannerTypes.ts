import { IProductData } from "./productTypes";

export const GET_BANNER = 'GET_BANNER'
export const UPDATE_BANNER = 'UPDATE_BANNER'

export interface IBanner {
  _id: string
  product: IProductData
}

export interface IGetBannerType {
  type: typeof GET_BANNER
  payload: IBanner[]
}

export interface IUpdateBannerType {
  type: typeof UPDATE_BANNER
  payload: IBanner
}