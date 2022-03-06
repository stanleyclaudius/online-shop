import { ChangeEvent, FormEvent } from 'react'
import rootReducer from './../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
  passwordConfirmation: string
}

export interface IUser extends IUserLogin {
  name: string
  avatar: string
  createdAt: string
  role: string
  type: string
  updatedAt: string
  _id: string
  province: string
  city: string
  district: string
  ward: string
  postalCode: string
  address: string
}