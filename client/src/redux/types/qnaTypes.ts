import { IUser } from './../../utils/Interface'

export const CREATE_QNA = 'CREATE_QNA'
export const GET_QNA = 'GET_QNA'
export const LIKE_QNA = 'LIKE_QNA'
export const UNLIKE_QNA = 'UNLIKE_QNA'

export interface ILikeUnlikeQnaData {
  id: string
  user: string
}

export interface IQnaData {
  _id?: string
  content: string
  reply?: string
  user: IUser
  product: string
  likes: string[]
  createdAt: string
}

export interface IQna {
  data: IQnaData[]
}

export interface ICreateQnaType {
  type: typeof CREATE_QNA
  payload: IQnaData
}

export interface IGetQnaType {
  type: typeof GET_QNA
  payload: IQnaData[]
}

export interface ILikeQnaType {
  type: typeof LIKE_QNA
  payload: ILikeUnlikeQnaData
}

export interface IUnlikeQnaType {
  type: typeof UNLIKE_QNA
  payload: ILikeUnlikeQnaData
}