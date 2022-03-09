import { GET_HOME_PRODUCT, IGetHomeProductType, IHomeProduct } from './../types/homeProductTypes'

const initialState = {
  data: [],
  maxPrice: 0,
  minPrice: 0
}

const homeProductReducer = (state: IHomeProduct = initialState, action: IGetHomeProductType) => {
  switch (action.type) {
    case GET_HOME_PRODUCT:
      return {
        ...state,
        data: action.payload.data,
        maxPrice: action.payload.maxPrice,
        minPrice: action.payload.minPrice
      }
    default:
      return state
  }
}

export default homeProductReducer