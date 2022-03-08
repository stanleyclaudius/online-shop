export const CREATE_PRODUCT = 'CREATE_PRODUCT'

type stock = {
  size: number
  stock: number
}

export interface IProductData {
  name: string
  brand: string | object
  category: string | object
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