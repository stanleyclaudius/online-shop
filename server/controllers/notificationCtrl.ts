import { Request, Response } from 'express'
import Notification from './../models/Notification'
import { io } from './../index'

const notificationCtrl = {
  createNotification: async(req: Request, res: Response) => {
    try {
      const { transaction, message } = req.body
      if (!transaction || !message)
        return res.status(400).json({ msg: 'Please provide transaction and message for notification.' })

      const newNotification = new Notification({ transaction, message })
      await newNotification.save()

      return res.status(200).json({ notification: newNotification })
    } catch (err: any) {
      return res.status(200).json({ msg: err.message })
    }
  },
  getNotification: async(req: Request, res: Response) => {
    try {
      const notifications = await Notification.find().sort('-createdAt').limit(10)
      return res.status(200).json({ notifications })
    } catch (err: any) {
      return res.status(200).json({ msg: err.message })
    }
  },
  readNotification: async(req: Request, res: Response) => {
    try {
      const notification = await Notification.findOneAndUpdate({ _id: req.params.id }, {
        isRead: true
      }, { new: true })
      
      return res.status(200).json({ notification })
    } catch (err: any) {
      return res.status(200).json({ msg: err.message })
    }
  }
}

export default notificationCtrl