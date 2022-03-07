export const CREATE_BRAND = 'CREATE_BRAND'

export interface IBrandData {
  _id?: string
  name: string
}

export interface IBrand {
  data: IBrandData[]
}

export interface ICreateBrandType {
  type: typeof CREATE_BRAND
  payload: IBrandData
}