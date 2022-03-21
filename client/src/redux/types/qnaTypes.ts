import { IUser } from './../../utils/Interface'

export const CREATE_QNA = 'CREATE_QNA'

export interface IQnaData {
  _id?: string
  content: string
  reply?: IQnaData
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