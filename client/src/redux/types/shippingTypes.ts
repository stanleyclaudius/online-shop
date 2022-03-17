export const SET_SHIPPING = 'SET_SHIPPING'
export const RESET_SHIPPING = 'RESET_SHIPPING'

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

export interface IResetShippingType {
  type: typeof RESET_SHIPPING
  payload: IShipping
}