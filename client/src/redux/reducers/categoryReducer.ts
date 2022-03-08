import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, ICategory, ICreateCategoryType, IDeleteCategoryType, IGetCategoryType, IUpdateCategoryType, UPDATE_CATEGORY } from './../types/categoryTypes'

const initialState = {
  data: []
}

const categoryReducer = (state: ICategory = initialState, action: IUpdateCategoryType | IDeleteCategoryType | IGetCategoryType | ICreateCategoryType) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_CATEGORY:
      return {
        ...state,
        data: action.payload
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    case UPDATE_CATEGORY:
      return{
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? action.payload : item)
      }
    default:
      return state
  }
}

export default categoryReducer