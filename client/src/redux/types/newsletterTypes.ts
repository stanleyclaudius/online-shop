export const GET_NEWSLETTERS = 'GET_NEWSLETTERS'
export const CREATE_NEWSLETTER = 'CREATE_NEWSLETTER'

export interface INewsletterData {
  _id?: string
  title: string
  content: string
}

export interface INewsletter {
  data: INewsletterData[]
  totalPage: number
}

export interface IGetNewslettersType {
  type: typeof GET_NEWSLETTERS
  payload: INewsletter
}

export interface ICreateNewsletterType {
  type: typeof CREATE_NEWSLETTER
  payload: INewsletterData
}