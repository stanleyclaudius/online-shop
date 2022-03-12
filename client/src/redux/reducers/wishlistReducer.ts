import { ADD_WISHLIST, IWishlistData, IAddWishlistType } from './../types/wishlistTypes'

const wishlistReducer = (state: IWishlistData[] = [], action: IAddWishlistType) => {
  switch (action.type) {
    case ADD_WISHLIST:
      const item = action.payload
      const isExists = state.find(i => i.product === item.product)
      if (isExists) {
        return state
      } else {
        return [item, ...state]
      }
    default:
      return state
  }
}

export default wishlistReducer