import { IQna, ICreateQnaType, CREATE_QNA, GET_QNA, IGetQnaType, ILikeQnaType, IUnlikeQnaType, LIKE_QNA, UNLIKE_QNA } from './../types/qnaTypes'

const initialState = {
  data: []
}

const qnaReducer = (state: IQna = initialState, action:ILikeQnaType | IUnlikeQnaType | IGetQnaType | ICreateQnaType) => {
  switch (action.type) {
    case CREATE_QNA:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case GET_QNA:
      return {
        ...state,
        data: action.payload
      }
    case LIKE_QNA:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload.id ? { ...item, likes: [...item.likes, action.payload.user] } : item)
      }
    case UNLIKE_QNA:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload.id ? { ...item, likes: item.likes.filter(like => like !== action.payload.user) } : item)
      }
    default:
      return state
  }
}

export default qnaReducer