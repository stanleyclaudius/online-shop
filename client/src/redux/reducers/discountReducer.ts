import {
  GET_DISCOUNTS,
  CREATE_DISCOUNT,
  UPDATE_DISCOUNT,
  DELETE_DISCOUNT,
  IDiscount,
  IGetDiscountsType,
  ICreateDiscountType,
  IUpdateDiscountType,
  IDeleteDiscountType
} from './../types/discountTypes'

const initialState = {
  data: []
}

const discountReducer = (state: IDiscount = initialState, action: IGetDiscountsType | IUpdateDiscountType | IDeleteDiscountType | ICreateDiscountType) => {
  switch (action.type) {
    case CREATE_DISCOUNT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_DISCOUNTS:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_DISCOUNT:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? action.payload : item)
      }
    case DELETE_DISCOUNT:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    default:
      return state
  }
}

export default discountReducer