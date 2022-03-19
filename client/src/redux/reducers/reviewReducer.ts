import { OPEN_REVIEW_MODAL, IReview, IOpenReviewModalType, CREATE_REVIEW, ICreateReviewType, IGetReviewType, GET_REVIEW } from './../types/reviewTypes'

const initialState = {
  data: [],
  isOpen: false
}

const reviewReducer = (state: IReview = initialState, action: IGetReviewType | ICreateReviewType | IOpenReviewModalType) => {
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
    default:
      return state
  }
}

export default reviewReducer