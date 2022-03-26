export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const GET_PRODUCT = 'GET_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const GET_HOME_PRODUCT = 'GET_HOME_PRODUCT'

type stock = {
  size: number
  stock: number
}

type nameDesc = {
  _id: string
  name: string
}

export interface IProductData {
  _id?: string
  name: string
  brand: string | nameDesc
  category: string | nameDesc
  colors: string[]
  sizes: number[]
  price: number
  discount: number
  description: string
  images: any[]
  stock: stock[]
  weight: number
}

export interface IProduct {
  totalPage: number
  data: IProductData[]
}

export interface IHomeProduct {
  data: IProductData[]
  totalPage: number
  maxPrice: number
  minPrice: number
}

export interface ICreateProductType {
  type: typeof CREATE_PRODUCT
  payload: IProductData
}

export interface IGetHomeProductType {
  type: typeof GET_HOME_PRODUCT
  payload: IHomeProduct
}

export interface IGetProductType {
  type: typeof GET_PRODUCT
  payload: IProduct
}

export interface IDeleteProductType {
  type: typeof DELETE_PRODUCT
  payload: string
}

export interface IUpdateProductType {
  type: typeof UPDATE_PRODUCT
  payload: IProductData
}