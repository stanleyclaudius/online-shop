import { Request, Response } from 'express'
import Newsletter from './../models/Newsletter'

const Pagination = (req: Request) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8
  const skip = (page - 1) * limit
  return { page, skip, limit }
}

const newsletterCtrl = {
  composeNewsletter: async(req: Request, res: Response) => {
    try {
      const { title, content } = req.body
      if (!title || !content)
        return res.status(400).json({ msg: 'Please provide title and content for newsletter.' })

      const newNewsletter = new Newsletter({ title, content })
      await newNewsletter.save()

      return res.status(200).json({
        msg: 'Newsletter has been created and sent to subscriber.',
        newsletter: newNewsletter
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getNewsletters: async(req: Request, res: Response) => {
    const { skip, limit } = Pagination(req)
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
          },
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