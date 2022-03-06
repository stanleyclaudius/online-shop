import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateActivationToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, { expiresIn: '30m' })
}

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' })
}

export const generateRefreshToken = (payload: object, res: Response) => {
  const refreshToken = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })

  res.cookie('sneakershub_rfToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })

  return refreshToken
}