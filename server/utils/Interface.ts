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

export interface IGooglePayload {
  email: string
  email_verified: boolean
  name: string
  picture: string
}

export interface IUserSocialRegister {
  name: string
  email: string
  password: string
  type: string
  avatar: string
}

export interface IXenditTransaction {
  id: string
  status: string
}