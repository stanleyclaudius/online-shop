import { Request, Response } from 'express'
import Product from './../models/Product'
import Category from './../models/Category'
import { pagination } from '../utils/pagination'

const categoryCtrl = {
  createCategory: async(req: Request, res: Response) => {
    try {
      const { name } = req.body
      if (!name)
        return res.status(400).json({ msg: 'Please provide category name.' })

      const category = await Category.findOne({ name })
      if (category)
        return res.status(400).json({ msg: 'Category already exists.' })

      const newCategory = new Category({ name })
      await newCategory.save()

      return res.status(200).json({
        msg: `Category ${name} has been created successfully.`,
        category: newCategory
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getCategory: async(req: Request, res: Response) => {
    try {
      const categories = await Category.find().sort('-createdAt')
      return res.status(200).json({ categories })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getAdminCategory: async(req: Request, res: Response) => {
    try {
      console.log('trigger')
      const { skip, limit } = pagination(req)

      const data = await Category.aggregate([
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

      const categories = data[0].totalData
      const categoryCount = data[0].count
      let totalPage = 0

      if (categories.length === 0) {
        totalPage = 0
      } else {
        if (categoryCount % limit === 0) {
          totalPage = categoryCount / limit
        } else {
          totalPage = Math.floor(categoryCount / limit) + 1
        }
      }

      return res.status(200).json({ categories, totalPage })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getHomeCategory: async(req: Request, res: Response) => {
    try {
      const categories = await Product.aggregate([
        {
          $lookup: {
            'from': 'categories',
            'localField': 'category',
            'foreignField': '_id',
            'as': 'category'
          }
        },
        { $unwind: '$category' },
        {
          $group: {
            _id: '$category._id',
            name: { $first: '$category.name' },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            count: 1,
            name: 1
          }
        }
      ])
      return res.status(200).json({ categories })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateCategory: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name)
        return res.status(400).json({ msg: 'Please provide category name.' })

      const validCategory = await Category.findOne({ _id: { $ne: id }, name })
      if (validCategory)
        return res.status(400).json({ msg: `${name} category already exists.` })

      const category = await Category.findOneAndUpdate({ _id: id }, {
        name
      }, { new: true })
      if (!category)
        return res.status(404).json({ msg: 'Category not found.' })

      return res.status(200).json({
        msg: 'Category has been updated successfully.',
        category
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteCategory: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const totalProduct = await Product.find({ category: id }).countDocuments()
      if (totalProduct > 0)
        return res.status(400).json({ msg: 'Failed to delete category, because products with this category still existed.' })

      const category = await Category.findByIdAndDelete(id)
      if (!category)
        return res.status(404).json({ msg: 'Category not found.' })

      return res.status(200).json({ msg: `${category.name} has been deleted successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default categoryCtrl