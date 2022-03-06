export const ALERT = 'ALERT'

export interface IAlert {
  loading?: boolean
  success?: string
  errors?: string
}

export interface IAlertType {
  type: typeof ALERT
  payload: IAlert
}