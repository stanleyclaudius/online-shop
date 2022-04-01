import { GET_BANNER, IBanner, IGetBannerType, IUpdateBannerType, UPDATE_BANNER } from './../types/bannerTypes'

const bannerReducer = (state: IBanner[] = [], action: IUpdateBannerType | IGetBannerType) => {
  switch (action.type) {
    case GET_BANNER:
      return action.payload
    case UPDATE_BANNER:
      return state.map(item => item._id === action.payload._id ? action.payload : item)
    default:
      return state
  }
}

export default bannerReducer