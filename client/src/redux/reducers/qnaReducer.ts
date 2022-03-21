import { IQna, ICreateQnaType, CREATE_QNA } from './../types/qnaTypes'

const initialState = {
  data: []
}

const qnaReducer = (state: IQna = initialState, action: ICreateQnaType) => {
  switch (action.type) {
    case CREATE_QNA:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    default:
      return state
  }
}

export default qnaReducer