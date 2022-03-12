import { ADD_TO_CART, ICartData, IAddToCartType } from './../types/cartTypes'

const cartReducer = (state: ICartData[] = [], action: IAddToCartType) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      const isExists = state.find(i => ((i._id === item._id) && (i.color === item.color) && (i.size === item.size)))
      if (isExists) {
        return state.map(i => i._id === item._id ? item : i)
      } else {
        return [action.payload, ...state]
      }
    default:
      return state
  }
}

export default cartReducer