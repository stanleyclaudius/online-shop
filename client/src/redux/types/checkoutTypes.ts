export const CREATE_CHECKOUT = 'CREATE_CHECKOUT'

export interface discountObj {
  code: string
  value: number
}

export interface itemsObj {
  qty: number
  color: string
  size: number
  discount: number
  product: string
}

export interface ICheckoutData {
  recipientName: string
  recipientPhone: string
  recipientEmail: string
  province: string
  city: string
  district: string
  postalCode: string
  address: string
  expedition: string
  expeditionService: string
  expeditionFee: number
  estimatedDay: string
  paymentMethod: string
  nameOnCard: string
  cardNumber: string
  expireMonth: string
  expireYear: string
  cvv: string
  ovoPhoneNumber: string
  discount: discountObj
  items: itemsObj[]
  totalPrice: number
  status?: string
  chargeId?: string
}

export interface ICheckout {
  data: ICheckoutData[]
}

export interface ICreateCheckoutType {
  type: typeof CREATE_CHECKOUT
  payload: ICheckoutData
}