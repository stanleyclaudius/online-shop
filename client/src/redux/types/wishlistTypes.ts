export const ADD_WISHLIST = 'ADD_WISHLIST'

export interface IWishlistData {
  _id?: string
  product: string
}

export interface IAddWishlistType {
  type: typeof ADD_WISHLIST
  payload: IWishlistData
}