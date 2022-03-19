import { IUser } from '../../utils/Interface'

export const OPEN_REVIEW_MODAL = 'OPEN_REVIEW_MODAL'
export const CREATE_REVIEW = 'CREATE_REVIEW'
export const GET_REVIEW = 'GET_REVIEW'
export const LIKE_REVIEW = 'LIKE_REVIEW'
export const UNLIKE_REVIEW = 'UNLIKE_REVIEW'

export interface IReviewData {
  _id?: string
  user: IUser
  product: string
  star: number
  content: string
  createdAt: string
  like: string[]
}

export interface ILikeUnlikeReviewData {
  id: string
  user: string
}

export interface IGetReviewData {
  reviews: IReviewData[]
  totalPage: number
}

export interface IReview {
  data: IReviewData[]
  totalPage: number
  isOpen: boolean | string
}

export interface IOpenReviewModalType {
  type: typeof OPEN_REVIEW_MODAL
  payload: boolean
}

export interface ICreateReviewType {
  type: typeof CREATE_REVIEW
  payload: IReviewData
}

export interface IGetReviewType {
  type: typeof GET_REVIEW
  payload: IGetReviewData
}

export interface ILikeReviewType {
  type: typeof LIKE_REVIEW
  payload: ILikeUnlikeReviewData
}

export interface IUnlikeReviewType {
  type: typeof UNLIKE_REVIEW
  payload: ILikeUnlikeReviewData
}