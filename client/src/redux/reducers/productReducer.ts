import { CREATE_PRODUCT, IProduct, ICreateProductType, GET_PRODUCT, IGetProductType, DELETE_PRODUCT, IDeleteProductType, IUpdateProductType, UPDATE_PRODUCT } from './../types/productTypes'

const initialState = {
  data: []
}

const productReducer = (state: IProduct = initialState, action: IGetProductType | ICreateProductType | IUpdateProductType | IDeleteProductType) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_PRODUCT:
      return {
        ...state,
        data: action.payload
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? action.payload : item)
      }
    default:
      return state
  }
}

export default productReducer