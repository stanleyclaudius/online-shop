import { Request, Response } from 'express'
import { pagination } from './../utils/pagination'
import { validateEmail } from './../utils/validator'
import Subscriber from './../models/Subscriber'

const subscriberCtrl = {
  getSubscriber: async(req: Request, res: Response) => {
    const { skip, limit } = pagination(req)

    try {
      const data = await Subscriber.aggregate([
        {
          $facet: {
            totalData: [
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ['$totalCount.count', 0] }
          }
        }
      ])

      const subscribers = data[0].totalData
      const subscriberCount = data[0].count
      let totalPage = 0

      if (subscribers.length === 0) {
        totalPage = 0
      } else {
        if (subscriberCount % limit === 0) {
          totalPage = subscriberCount / limit
        } else {
          totalPage = Math.floor(subscriberCount / limit) + 1
        }
      }

      return res.status(200).json({
        subscribers,
        totalPage
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createSubscriber: async(req: Request, res: Response) => {
    try {
      const { email } = req.body
      if (!email)
        return res.status(400).json({ msg: 'Please provide email address.' })

      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Email address format is incorrect.' })

      const findSubscriber = await Subscriber.findOne({ email })
      if (findSubscriber)
        return res.status(400).json({ msg: 'Email is currently subscribing to Sneakershub newsletter.' })

      const newSubscriber = new Subscriber({ email })
      await newSubscriber.save()

      return res.status(200).json({
        msg: 'Successfully subscribe to Sneakershub newsletter.',
        subscriber: newSubscriber
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteSubscriber: async(req: Request, res: Response) => {
    try {
      const subscriber = await Subscriber.findOneAndDelete({ _id: req.params.id })
      if (!subscriber)
        return res.status(404).json({ msg: 'Subscriber not found.' })
        
      return res.status(200).json({ msg: 'Subscriber has been deleted successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default subscriberCtrl