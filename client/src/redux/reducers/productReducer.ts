import { CREATE_PRODUCT, IProduct, ICreateProductType, GET_PRODUCT, IGetProductType, DELETE_PRODUCT, IDeleteProductType } from './../types/productTypes'

const initialState = {
  data: []
}

const productReducer = (state: IProduct = initialState, action: IGetProductType | ICreateProductType | IDeleteProductType) => {
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
    default:
      return state
  }
}

export default productReducer