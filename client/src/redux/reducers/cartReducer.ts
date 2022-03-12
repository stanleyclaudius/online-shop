import { ADD_TO_CART, ICartData, IAddToCartType, GET_CART, IGetCartType, RESET_CART, IResetCartType } from './../types/cartTypes'

const cartReducer = (state: ICartData[] = [], action: IResetCartType | IGetCartType | IAddToCartType) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      const isExists = state.find(i => ((i._id === item._id) && (i.color === item.color) && (i.size === item.size)))
      if (isExists) {
        return state.map(i => i._id === item._id ? item : i)
      } else {
        return [action.payload, ...state]
      }
    case GET_CART:
      return action.payload
    case RESET_CART:
      return []
    default:
      return state
  }
}

export default cartReducer