export const CREATE_BRAND = 'CREATE_BRAND'
export const GET_BRAND = 'GET_BRAND'
export const DELETE_BRAND = 'DELETE_BRAND'
export const UPDATE_BRAND = 'UPDATE_BRAND'

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

export interface IGetBrandType {
  type: typeof GET_BRAND,
  payload: IBrandData[]
}

export interface IDeleteBrandType {
  type: typeof DELETE_BRAND
  payload: string
}

export interface IUpdateBrandType {
  type: typeof UPDATE_BRAND
  payload: IBrandData
}