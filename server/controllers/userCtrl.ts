import { Request, Response } from 'express'
import { pagination } from './../utils/pagination'
import User from './../models/User'

const userCtrl = {
  getAllUser: async(req: Request, res: Response) => {
    try {
      const { skip, limit } = pagination(req)
      
      const data = await User.aggregate([
        {
          $facet: {
            totalData: [
              { $match: { role: { $ne: 'admin' } } },
              { $sort: { createdAt: -1} },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $match: { role: { $ne: 'admin' } } },
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ['$totalCount.count', 0] },
            totalData: 1
          }
        }
      ])

      const users = data[0].totalData
      const userCount= data[0].count
      let totalPage = 0

      if (users.length === 0) {
        totalPage = 0
      } else {
        if (userCount % limit === 0) {
          totalPage = userCount / limit
        } else {
          totalPage = Math.floor(userCount / limit) + 1
        }
      }

      return res.status(200).json({ users, totalPage })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}


export default userCtrl