export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const GET_CATEGORY = 'GET_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const GET_HOME_CATEGORY = 'GET_HOME_CATEGORY'

export interface ICategoryData {
  _id?: string
  name: string
}

export interface IHomeCategoryData extends ICategoryData {
  count: number
}

export interface ICategory {
  totalPage: number
  data: ICategoryData[]
}

export interface IHomeCategory {
  data: IHomeCategoryData[]
}

export interface ICreateCategoryType {
  type: typeof CREATE_CATEGORY
  payload: ICategoryData
}

export interface IGetCategoryType {
  type: typeof GET_CATEGORY
  payload: ICategory
}

export interface IGetHomeCategoryType {
  type: typeof GET_HOME_CATEGORY
  payload: IHomeCategoryData[]
}

export interface IDeleteCategoryType {
  type: typeof DELETE_CATEGORY
  payload: string
}

export interface IUpdateCategoryType {
  type: typeof UPDATE_CATEGORY
  payload: ICategoryData
}