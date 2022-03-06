import { Request, Response } from 'express'
import { validateEmail } from './../utils/validator'
import { generateActivationToken } from './../utils/generateToken'
import { IDecodedToken } from './../utils/Interface'
import User from './../models/User'
import sendEmail from './../utils/sendMail'
import jwt from 'jsonwebtoken'

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

      const newUser = { name, email, password }
      const token = generateActivationToken({ newUser })
      const url = `${process.env.CLIENT_URL}/activate/${token}`

      sendEmail(email, url, 'Account Activation')
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
  }
}

export default authCtrl