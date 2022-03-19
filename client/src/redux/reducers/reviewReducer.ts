import { OPEN_REVIEW_MODAL, IReview, IOpenReviewModalType, CREATE_REVIEW, ICreateReviewType, IGetReviewType, GET_REVIEW, IUnlikeReviewType, LIKE_REVIEW, ILikeReviewType, UNLIKE_REVIEW } from './../types/reviewTypes'

const initialState = {
  data: [],
  isOpen: false
}

const reviewReducer = (state: IReview = initialState, action: ILikeReviewType | IUnlikeReviewType | IGetReviewType | ICreateReviewType | IOpenReviewModalType) => {
  switch (action.type) {
    case OPEN_REVIEW_MODAL:
      return {
        ...state,
        isOpen: action.payload
      }
    case CREATE_REVIEW:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_REVIEW:
      return {
        ...state,
        data: action.payload
      }
    case LIKE_REVIEW:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload.id ? { ...item, like: [...item.like, action.payload.user] } : item)
      }
    case UNLIKE_REVIEW:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload.id ? { ...item, like: item.like.filter(i => i !== action.payload.user) } : item)
      }
    default:
      return state
  }
}

export default reviewReducer