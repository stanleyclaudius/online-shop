import { Request, Response } from 'express'
import User from './../models/User'

const userCtrl = {
  getAllUser: async(req: Request, res: Response) => {
    try {
      const users = await User.find({ role: { $ne: 'admin' } }).sort('-createdAt')
      return res.status(200).json({ users })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}


export default userCtrl