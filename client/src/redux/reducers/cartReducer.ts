import { ADD_TO_CART, ICartData, IAddToCartType, GET_CART, IGetCartType, RESET_CART, IResetCartType, DELETE_CART_ITEM, IDeleteCartItemType } from './../types/cartTypes'

const cartReducer = (state: ICartData[] = [], action: IDeleteCartItemType | IResetCartType | IGetCartType | IAddToCartType) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      const isExists = state.find(i => (
        (i._id === item._id || i.product?._id === item._id) && 
        (i.color === item.color) && 
        ((typeof i.size === 'string' ? parseInt(i.size) : i.size) === item.size)
      ))
      if (isExists) {
        return state.map(i => (
          (i._id === item._id || i.product?._id === item._id) &&
          (i.color === item.color) &&
          ((typeof i.size === 'string' ? parseInt(i.size) : i.size) === item.size)) ? item : i)
      } else {
        return [action.payload, ...state]
      }
    case GET_CART:
      return action.payload
    case RESET_CART:
      return action.payload
    case DELETE_CART_ITEM:
      return state.filter(item => !((item._id === action.payload.productId || item.product?._id === action.payload.productId) && item.color === action.payload.productColor && item.size === action.payload.productSize))
    default:
      return state
  }
}

export default cartReducer