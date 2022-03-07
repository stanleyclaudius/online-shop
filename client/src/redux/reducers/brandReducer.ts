import { CREATE_BRAND, IBrand, ICreateBrandType } from './../types/brandTypes'

const initialState = {
  data: []
}

const brandReducer = (state: IBrand = initialState, action: ICreateBrandType) => {
  switch (action.type) {
    case CREATE_BRAND:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    default:
      return state
  }
}

export default brandReducer