import { CREATE_SUBSCRIBER, DELETE_SUBSCRIBER, GET_SUBSCRIBER, ICreateSubscriberType, IDeleteSubscriberType, IGetSubscriberType, ISubscriber } from './../types/subscriberTypes'

const initialState = {
  data: [],
  totalPage: 0
}

const subscriberReducer = (state: ISubscriber = initialState, action: ICreateSubscriberType | IDeleteSubscriberType | IGetSubscriberType) => {
  switch (action.type) {
    case GET_SUBSCRIBER:
      return { ...action.payload }
    case CREATE_SUBSCRIBER:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case DELETE_SUBSCRIBER:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    default:
      return state
  }
}

export default subscriberReducer