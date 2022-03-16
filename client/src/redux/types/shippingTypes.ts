export const SET_SHIPPING = 'SET_SHIPPING'

export interface IShipping {
  province: string
  city: string
  district: string
  postalCode: string
  address: string
  expedition: string
  expeditionService: string
  courierFee: number
  estimatedDay: string
}

export interface ISetShippingType {
  type: typeof SET_SHIPPING
  payload: IShipping
}