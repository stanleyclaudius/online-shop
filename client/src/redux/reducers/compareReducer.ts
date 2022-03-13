import { OPEN_COMPARE_MODAL, IOpenCompareModalType } from './../types/compareTypes'

const compareReducer = (state: boolean = false, action: IOpenCompareModalType) => {
  switch (action.type) {
    case OPEN_COMPARE_MODAL:
      return action.payload
    default:
      return state
  }
}

export default compareReducer