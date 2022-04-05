export const CREATE_SUBSCRIBER = 'CREATE_SUBSCRIBER'
export const DELETE_SUBSCRIBER = 'DELETE_SUBSCRIBER'
export const GET_SUBSCRIBER = 'GET_SUBSCRIBER'

export interface ISubscriberData {
  _id?: string
  email: string
}

export interface ISubscriber {
  data: ISubscriberData[]
  totalPage: number
}

export interface ICreateSubscriberType {
  type: typeof CREATE_SUBSCRIBER
  payload: ISubscriberData
}

export interface IDeleteSubscriberType {
  type: typeof DELETE_SUBSCRIBER
  payload: string
}

export interface IGetSubscriberType {
  type: typeof GET_SUBSCRIBER
  payload: ISubscriber
}