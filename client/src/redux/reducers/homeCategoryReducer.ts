import { GET_HOME_CATEGORY, IGetHomeCategoryType, IHomeCategory } from './../types/categoryTypes'

const initialState = {
  data: []
}

const homeCategoryReducer = (state: IHomeCategory = initialState, action: IGetHomeCategoryType) => {
  switch (action.type) {
    case GET_HOME_CATEGORY:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default homeCategoryReducer