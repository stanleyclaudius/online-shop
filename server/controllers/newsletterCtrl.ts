import { Request, Response } from 'express'
import { pagination } from './../utils/pagination'
import Subscriber from './../models/Subscriber'
import Newsletter from './../models/Newsletter'
import sendEmail from './../utils/sendMail'

const newsletterCtrl = {
  composeNewsletter: async(req: Request, res: Response) => {
    try {
      const { title, content } = req.body
      if (!title || !content)
        return res.status(400).json({ msg: 'Please provide title and content for newsletter.' })

      const newNewsletter = new Newsletter({ title, content })
      await newNewsletter.save()

      const subscribers = await Subscriber.find()
      subscribers.forEach(item => {
        sendEmail(item.email, 'Newsletter', content)
      })

      return res.status(200).json({
        msg: 'Newsletter has been created and sent to subscriber.',
        newsletter: newNewsletter
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getNewsletters: async(req: Request, res: Response) => {
    const { skip, limit } = pagination(req)
    try {
      const data = await Newsletter.aggregate([
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

      const newsletters = data[0].totalData
      const newsletterCount = data[0].count
      let totalPage = 0

      if (newsletters.length === 0) {
        totalPage = 0
      } else {
        if (newsletterCount % limit === 0) {
          totalPage = newsletterCount / limit
        } else {
          totalPage = Math.floor(newsletterCount / limit) + 1
        }
      }

      return res.status(200).json({
        newsletters,
        totalPage
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getNewsletterById: async(req: Request, res: Response) => {
    try {
      const newsletter = await Newsletter.findById(req.params.id)
      if (!newsletter)
        return res.status(404).json({ msg: 'Newsletter not found.' })

      return res.status(200).json({ newsletter })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default newsletterCtrl