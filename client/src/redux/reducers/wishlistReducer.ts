import { ADD_WISHLIST, IWishlistData, IAddWishlistType, GET_WISHLIST, IGetWishlistType, IResetWishlistType, RESET_WISHLIST, IDeleteWishlistItemType, DELETE_WISHLIST_ITEM } from './../types/wishlistTypes'

const wishlistReducer = (state: IWishlistData[] = [], action:IDeleteWishlistItemType | IResetWishlistType | IGetWishlistType | IAddWishlistType) => {
  switch (action.type) {
    case ADD_WISHLIST:
      const item = action.payload
      const isExists = state.find(i => i.product === item.product)
      if (isExists) {
        return state
      } else {
        return [item, ...state]
      }
    case GET_WISHLIST:
      return action.payload
    case RESET_WISHLIST:
      return action.payload
    case DELETE_WISHLIST_ITEM:
      return state.filter(item => item.product._id !== action.payload)
    default:
      return state
  }
}

export default wishlistReducer