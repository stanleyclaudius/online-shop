import {
  GET_BRAND,
  CREATE_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
  IBrand,
  IGetBrandType,
  ICreateBrandType,
  IUpdateBrandType,
  IDeleteBrandType
} from './../types/brandTypes'

const initialState = {
  totalPage: 0,
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
        ...action.payload
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