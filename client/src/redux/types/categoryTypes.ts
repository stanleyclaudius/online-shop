export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const GET_CATEGORY = 'GET_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

export interface ICategoryData {
  _id?: string
  name: string
}

export interface ICategory {
  data: ICategoryData[]
}

export interface ICreateCategoryType {
  type: typeof CREATE_CATEGORY
  payload: ICategoryData
}

export interface IGetCategoryType {
  type: typeof GET_CATEGORY
  payload: ICategoryData[]
}

export interface IDeleteCategoryType {
  type: typeof DELETE_CATEGORY
  payload: string
}

export interface IUpdateCategoryType {
  type: typeof UPDATE_CATEGORY
  payload: ICategoryData
}