export const CREATE_DISCOUNT = 'CREATE_DISCOUNT'
export const GET_DISCOUNTS = 'GET_DISCOUNTS'
export const UPDATE_DISCOUNT = 'UPDATE_DISCOUNT'
export const DELETE_DISCOUNT = 'DELETE_DISCOUNT'

export interface IDiscountData {
  _id?: string
  code: string
  value: number
}

export interface IDiscount {
  data: IDiscountData[],
  totalPage: number
}

export interface ICreateDiscountType {
  type: typeof CREATE_DISCOUNT
  payload: IDiscountData
}

export interface IGetDiscountsType {
  type: typeof GET_DISCOUNTS
  payload: IDiscount
}

export interface IUpdateDiscountType {
  type: typeof UPDATE_DISCOUNT
  payload: IDiscountData
}

export interface IDeleteDiscountType {
  type: typeof DELETE_DISCOUNT
  payload: string
}