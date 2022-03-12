import { IProductData } from './productTypes'

export const ADD_TO_CART = 'ADD_TO_CART'
export const GET_CART = 'GET_CART'
export const RESET_CART = 'RESET_CART'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

export interface ICartData {
  _id: string
  name: string
  price: string
  image: string
  qty: number
  color: string
  size: number
  product?: IProductData
}

export interface IDeleteCartData {
  productId: string
  productSize: number
  productColor: string
  token?: string
}

export interface IAddToCartType {
  type: typeof ADD_TO_CART
  payload: ICartData
}

export interface IGetCartType {
  type: typeof GET_CART
  payload: ICartData[]
}

export interface IResetCartType {
  type: typeof RESET_CART
  payload: Array<any>
}

export interface IDeleteCartItemType {
  type: typeof DELETE_CART_ITEM
  payload: IDeleteCartData
}