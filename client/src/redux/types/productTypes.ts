export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const GET_PRODUCT = 'GET_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

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
  images: string[] | File[]
  stock: stock[]
}

export interface IProduct {
  data: IProductData[]
}

export interface ICreateProductType {
  type: typeof CREATE_PRODUCT
  payload: IProductData
}

export interface IGetProductType {
  type: typeof GET_PRODUCT
  payload: IProductData[]
}

export interface IDeleteProductType {
  type: typeof DELETE_PRODUCT
  payload: string
}

export interface IUpdateProductType {
  type: typeof UPDATE_PRODUCT
  payload: IProductData
}