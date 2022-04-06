import { Request, Response } from 'express'
import { validateEmail } from './../utils/validator'
import { generateAccessToken, generateActivationToken, generateRefreshToken } from './../utils/generateToken'
import { IDecodedToken, IGooglePayload, IReqUser, IUser, IUserSocialRegister } from './../utils/Interface'
import { OAuth2Client } from 'google-auth-library'
import User from './../models/User'
import sendEmail from './../utils/sendMail'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fetch from 'cross-fetch'
import { authEmailFormat } from '../utils/authEmailFormat'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const authCtrl = {
  register: async(req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body
      if (!name || !email || !password)
        return res.status(400).json({ msg: 'Please fill up every field.' })

      if (!validateEmail)
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      if (password.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

      const user = await User.findOne({ email })
      if (user)
        return res.status(400).json({ msg: `Email ${email} has been used before.` })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = { name, email, password: passwordHash }
      const token = generateActivationToken({ newUser })
      const url = `${process.env.CLIENT_URL}/activate/${token}`

      const emailFormat = authEmailFormat('Account Activation', url)
      sendEmail(email, 'Account Activation', emailFormat)
      return res.status(200).json({ msg: `Account activation email has been sent to ${email}.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  activateAccount: async(req: Request, res: Response) => {
    try {
      const { token } = req.body
      if (!token)
        return res.status(400).json({ msg: 'Please provide account activation token.' })
      
      const { newUser } = <IDecodedToken>jwt.verify(token, `${process.env.ACTIVATION_TOKEN_SECRET}`)
      if (!newUser)
        return res.status(400).json({ msg: 'Account activation token invalid.' })

      const user = await User.findOne({ email: newUser.email })
      if (user)
        return res.status(400).json({ msg: `Email ${newUser.email} has been used before.` })

      const activeUser = new User(newUser)
      await activeUser.save()
      return res.status(200).json({ msg: 'Account has been activated successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password)
        return res.status(400).json({ msg: 'Please fill up every field.' })
      
      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      const user = await User.findOne({ email })
      if (!user)
        return res.status(400).json({ msg: 'Invalid credential.' })

      loginUser(user, password, res)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async(req: IReqUser, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid authentication.' })

    try {
      res.clearCookie('sneakershub_rfToken', { path: '/api/v1/auth/refresh_token' })

      await User.findOneAndUpdate({ _id: req.user._id }, {
        rf_token: ''
      })

      return res.status(200).json({ msg: 'Logout success.' })
    } catch (err: any) {
      return res.status(400).json({ msg: err.message })
    }
  },
  refreshToken: async(req: Request, res: Response) => {
    try {
      const { sneakershub_rfToken: token } = req.cookies
      if (!token)
        return res.status(400).json({ msg: 'Invalid authentication.' })

      const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id)
        return res.status(400).json({ msg: 'Invalid authentication.' })

      const user = await User.findOne({ _id: decoded.id }).select('-password +rf_token')
      if (!user)
        return res.status(400).json({ msg: 'Invalid authentication.' })

      if (token !== user.rf_token)
        return res.status(400).json({ msg: 'Invalid authentication.' })

      const accessToken = generateAccessToken({ id: user._id })
      const refreshToken = generateRefreshToken({ id: user._id }, res)

      await User.findOneAndUpdate({ _id: user._id }, {
        rf_token: refreshToken
      })

      return res.status(200).json({
        accessToken,
        user
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  googleLogin: async(req: Request, res: Response) => {
    try {
      const { token } = req.body
      const verify = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      const { email, email_verified, name, picture } = <IGooglePayload>verify.getPayload()

      if (!email_verified)
        return res.status(400).json({ msg: 'Email hasn\'t been verified yet.' })

      const password = email + '824jjKFdjFJFJYYouuRURRd))DPP-__pPpapPasswordddRR))=-_hHeree'
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await User.findOne({ email })

      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name,
          email,
          password: passwordHash,
          type: 'google',
          avatar: picture
        }
        registerUser(user, res)
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  facebookLogin: async(req: Request, res: Response) => {
    try {
      const { accessToken, userID } = req.body

      const facebookEndpoint = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

      const data = await fetch(facebookEndpoint)
        .then(res => res.json())
        .then(res => { return res })

      const { email, name, picture } = data

      const password = email + 'd8f9jio3jkledskflYYufouroruuuRURRpPpasosowrdddsoGoosgghheereREerer'
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await User.findOne({ email })

      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name,
          email,
          password: passwordHash,
          type: 'facebook',
          avatar: picture.data.url
        }
        registerUser(user, res)
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  editProfile: async(req: IReqUser, res: Response) => {
    try {
      const { name, phoneNumber, province, city, district, postalCode, avatar, address } = req.body
      
      if (!name)
        return res.status(400).json({ msg: 'Please provide your name.' })

      const updatedUser = await User.findOneAndUpdate({ _id: req.user?._id }, {
        name, avatar, phone: phoneNumber, province, city, district, postalCode, address
      }, { new: true })

      if (!updatedUser)
        return res.status(404).json({ msg: 'User not found.' })

      return res.status(200).json({
        user: updatedUser._doc,
        msg: 'Profile updated successfully.'
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  changePassword: async(req: IReqUser, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body

      if (!currentPassword || !newPassword)
        return res.status(400).json({ msg: 'Please provide your current password and new password.' })

      if (newPassword.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

      if (req.user?.type !== 'register')
        return res.status(400).json({ msg: `User that login with ${req.user?.type} can't change their password.` })

      const checkCurrPassword = await bcrypt.compare(currentPassword, `${req.user?.password}`)
      if (!checkCurrPassword)
        return res.status(400).json({ msg: 'Current password doesn\'t match.' })

      const passwordHash = await bcrypt.hash(newPassword, 12)

      await User.findOneAndUpdate({ _id: req.user?._id }, {
        password: passwordHash
      })
      
      return res.status(200).json({ msg: 'Password has been changed successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  forgetPassword: async(req: Request, res: Response) => {
    try {
      const findUser = await User.findOne({ email: req.body.email })
      if (!findUser)
        return res.status(404).json({ msg: `User with ${req.body.email} not found.` })

      const token = generateAccessToken({ id: findUser._id })
      const url = `${process.env.CLIENT_URL}/reset/${token}`

      const emailContent = authEmailFormat('Reset Password', url)
      sendEmail(req.body.email, 'Reset Password', emailContent)

      return res.status(200).json({ msg: `Reset password link has been sent to ${req.body.email}` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async(req: Request, res: Response) => {
    try {
      const { password } = req.body
      if (!password)
        return res.status(400).json({ msg: 'Please provide new password.' })

      if (password.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })
      
      const decoded = <IDecodedToken>jwt.verify(req.params.token, `${process.env.ACCESS_TOKEN_SECRET}`)
      if (!decoded.id)
        return res.status(400).json({ msg: 'Invalid reset password token.' })

      const user = await User.findById(decoded.id)
      if (!user)
        return res.status(400).json({ msg: 'Invalid reset password token.' })

      const passwordHash = await bcrypt.hash(password, 12)

      await User.findOneAndUpdate({ _id: decoded.id }, {
        password: passwordHash
      })

      return res.status(200).json({ msg: 'Password has been reset successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    let msg = user.type === 'register' ? 'Invalid credential' : `This account use ${user.type} login feature.`
    return res.status(400).json({ msg })
  }

  const accessToken = generateAccessToken({ id: user._id })
  const refreshToken = generateRefreshToken({ id: user._id }, res)

  await User.findOneAndUpdate({ _id: user._id }, {
    rf_token: refreshToken
  })

  return res.status(200).json({
    msg: `Authenticated as ${user.name}`,
    accessToken,
    user: {
      ...user._doc,
      password: ''
    }
  })
}

const registerUser = async (user: IUserSocialRegister, res: Response) => {
  const newUser = new User(user)

  const accessToken = generateAccessToken({ id: newUser._id })
  const refreshToken = generateRefreshToken({ id: newUser._id }, res)

  newUser.rf_token = refreshToken
  await newUser.save()

  return res.status(200).json({
    msg: `Authenticated as ${newUser.name}`,
    accessToken,
    user: {
      ...newUser._doc,
      password: ''
    }
  })
}

export default authCtrl