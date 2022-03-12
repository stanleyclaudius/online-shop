export const ADD_TO_CART = 'ADD_TO_CART'

export interface ICartData {
  _id: string
  name: string
  price: string
  image: string
  qty: number
  color: string
  size: number
}

export interface IAddToCartType {
  type: typeof ADD_TO_CART
  payload: ICartData
}