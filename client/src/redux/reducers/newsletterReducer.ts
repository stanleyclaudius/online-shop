import { CREATE_NEWSLETTER, GET_NEWSLETTERS, ICreateNewsletterType, IGetNewslettersType, INewsletter } from './../types/newsletterTypes'

const initialState = {
  data: [],
  totalPage: 0
}

const newsletterReducer = (state: INewsletter = initialState, action: ICreateNewsletterType | IGetNewslettersType) => {
  switch (action.type) {
    case CREATE_NEWSLETTER:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case GET_NEWSLETTERS:
      return { ...action.payload }
    default:
      return state
  }
}

export default newsletterReducer