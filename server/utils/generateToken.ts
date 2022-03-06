import jwt from 'jsonwebtoken'

export const generateActivationToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, { expiresIn: '30m' })
}

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' })
}