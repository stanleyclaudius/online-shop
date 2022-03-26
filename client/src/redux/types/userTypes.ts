import { IUser } from "../../utils/Interface";

export const GET_ALL_USER = 'GET_ALL_USER'

export interface IUserReducer {
  data: IUser[]
}

export interface IGetAllUserType {
  type: typeof GET_ALL_USER
  payload: IUser[]
}