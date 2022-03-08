import { CREATE_PRODUCT, IProduct, ICreateProductType } from './../types/productTypes'

const initialState = {
  data: []
}

const productReducer = (state: IProduct = initialState, action: ICreateProductType) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    default:
      return state
  }
}

export default productReducer