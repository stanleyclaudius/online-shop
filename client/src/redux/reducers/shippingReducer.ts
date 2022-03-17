import { IResetShippingType, ISetShippingType, IShipping, RESET_SHIPPING, SET_SHIPPING } from './../types/shippingTypes'

const initialState = {
  province: '',
  city: '',
  district: '',
  postalCode: '',
  address: '',
  expedition: '',
  expeditionService: '',
  courierFee: 0,
  estimatedDay: ''
}

const shippingReducer = (state: IShipping = initialState, action:IResetShippingType | ISetShippingType) => {
  switch (action.type) {
    case SET_SHIPPING:
      return action.payload
    case RESET_SHIPPING:
      return {
        province: '',
        city: '',
        district: '',
        postalCode: '',
        address: '',
        expedition: '',
        expeditionService: '',
        courierFee: 0,
        estimatedDay: ''
      }
    default:
      return state
  }
}

export default shippingReducer