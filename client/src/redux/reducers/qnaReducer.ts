import { IQna, ICreateQnaType, CREATE_QNA, GET_QNA, IGetQnaType } from './../types/qnaTypes'

const initialState = {
  data: []
}

const qnaReducer = (state: IQna = initialState, action:IGetQnaType | ICreateQnaType) => {
  switch (action.type) {
    case CREATE_QNA:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_QNA:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default qnaReducer