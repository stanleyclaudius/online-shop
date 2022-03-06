import { Request } from 'express'
import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  avatar: string
  role: string
  type: string
  rf_token: string
  province: string
  city: string
  district: string
  ward: string
  postalCode: string
  address: string
  _doc: object
}

export interface INewUser {
  name: string
  email: string
  password: string
}

export interface IDecodedToken {
  id?:string
  newUser?: INewUser
  iat: number
  exp: number
}

export interface IReqUser extends Request {
  user?: IUser
}