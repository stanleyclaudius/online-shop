import { Request, Response } from 'express'
import Brand from './../models/Brand'

const Pagination = (req: Request) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

const brandCtrl = {
  createBrand: async(req: Request, res: Response) => {
    try {
      const { name } = req.body
      if (!name)
        return res.status(400).json({ msg: 'Please provide brand name,' })

      const brand = await Brand.findOne({ name })
      if (brand)
        return res.status(400).json({ msg: 'Brand already exists.' })

      const newBrand = new Brand({ name })
      await newBrand.save()

      return res.status(200).json({
        msg: `Brand ${name} has been created successfully.`,
        brand: newBrand
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getBrand: async(req: Request, res: Response) => {
    try {
      const brands = await Brand.find().sort('-createdAt')
      return res.status(200).json({ brands })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteBrand: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const brand = await Brand.findByIdAndDelete(id)
      if (!brand)
        return res.status(404).json({ msg: 'Brand not found.' })

      return res.status(200).json({ msg: `Brand ${brand.name} has been deleted successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateBrand: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name)
        return res.status(400).json({ msg: 'Please provide brand name.' })

      const brandExist = await Brand.findOne({ _id: { $ne: id }, name })
      if (brandExist)
        return res.status(400).json({ msg: 'Brand exists already.' })

      const brand = await Brand.findOneAndUpdate({ _id: id }, {
        name
      },  { new: true })
      if (!brand)
        return res.status(404).json({ msg: 'Brand not found.' })

      return res.status(200).json({
        msg: `Brand has been updated successfully.`,
        brand
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getBrandAdmin: async(req: Request, res: Response) => {
    try {
      const { skip, limit } = Pagination(req)
      const data = await Brand.aggregate([
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
            count: { $arrayElemAt: ['$totalCount.count', 0] },
            totalData: 1
          }
        }
      ])

      const brands = data[0].totalData
      const brandCount = data[0].count
      let totalPage = 0

      if (brands.length === 0) {
        totalPage = 0
      } else {
        if (brandCount % limit === 0) {
          totalPage = brandCount / limit
        } else {
          totalPage = Math.floor(brandCount / limit) + 1
        }
      }

      return res.status(200).json({ brands, totalPage })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default brandCtrl