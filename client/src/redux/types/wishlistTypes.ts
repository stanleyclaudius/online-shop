import { IProductData } from './productTypes'

export const ADD_WISHLIST = 'ADD_WISHLIST'
export const GET_WISHLIST = 'GET_WISHLIST'
export const DELETE_WISHLIST_ITEM = 'DELETE_WISHLIST_ITEM'
export const RESET_WISHLIST = 'RESET_WISHLIST'

export interface IWishlistData {
  _id?: string
  product: IProductData
}

export interface IAddWishlistType {
  type: typeof ADD_WISHLIST
  payload: IWishlistData
}

export interface IGetWishlistType {
  type: typeof GET_WISHLIST
  payload: IWishlistData[]
}

export interface IResetWishlistType {
  type: typeof RESET_WISHLIST
  payload: Array<any>
}

export interface IDeleteWishlistItemType {
  type: typeof DELETE_WISHLIST_ITEM
  payload: string
}