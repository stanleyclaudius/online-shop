import { GET_BRAND, CREATE_BRAND, IBrand, ICreateBrandType, IGetBrandType, DELETE_BRAND, IDeleteBrandType, UPDATE_BRAND, IUpdateBrandType } from './../types/brandTypes'

const initialState = {
  data: []
}

const brandReducer = (state: IBrand = initialState, action: IUpdateBrandType | IDeleteBrandType | ICreateBrandType | IGetBrandType) => {
  switch (action.type) {
    case CREATE_BRAND:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_BRAND:
      return {
        ...state,
        data: action.payload
      }
    case DELETE_BRAND:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    case UPDATE_BRAND:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? action.payload : item)
      }
    default:
      return state
  }
}

export default brandReducer