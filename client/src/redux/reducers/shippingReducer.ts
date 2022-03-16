import { ISetShippingType, IShipping, SET_SHIPPING } from './../types/shippingTypes'

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

const shippingReducer = (state: IShipping = initialState, action: ISetShippingType) => {
  switch (action.type) {
    case SET_SHIPPING:
      return action.payload
    default:
      return state
  }
}

export default shippingReducer