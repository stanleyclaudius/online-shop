import { IUser } from '../../utils/Interface'

export const OPEN_REVIEW_MODAL = 'OPEN_REVIEW_MODAL'
export const CREATE_REVIEW = 'CREATE_REVIEW'

export interface IReviewData {
  user: IUser
  product: string
  star: number
  content: string
  createdAt: string
}

export interface IReview {
  data: IReviewData[]
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