import { GET_HOME_PRODUCT, IGetHomeProductType, IHomeProduct } from './../types/productTypes'

const initialState = {
  data: [],
  totalPage: 0,
  maxPrice: 0,
  minPrice: 0
}

const homeProductReducer = (state: IHomeProduct = initialState, action: IGetHomeProductType) => {
  switch (action.type) {
    case GET_HOME_PRODUCT:
      return {
        ...state,
        data: action.payload.data,
        totalPage: action.payload.totalPage,
        maxPrice: action.payload.maxPrice,
        minPrice: action.payload.minPrice
      }
    default:
      return state
  }
}

export default homeProductReducer