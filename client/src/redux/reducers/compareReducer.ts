import { IProductData } from './../types/productTypes'
import { OPEN_COMPARE_MODAL, IOpenCompareModalType, ICompare, SET_COMPARE_DATA, ISetCompareType } from './../types/compareTypes'

const initialState = {
  data: {} as IProductData,
  isOpen: false
}

const compareReducer = (state: ICompare = initialState, action:ISetCompareType | IOpenCompareModalType) => {
  switch (action.type) {
    case OPEN_COMPARE_MODAL:
      return {
        ...state,
        data: {} as IProductData,
        isOpen: action.payload
      }
    case SET_COMPARE_DATA:
      return {
        ...state,
        data: action.payload,
        isOpen: true
      }
    default:
      return state
  }
}

export default compareReducer