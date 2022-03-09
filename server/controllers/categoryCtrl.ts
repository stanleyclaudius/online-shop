import { Request, Response } from 'express'
import Product from './../models/Product'
import Category from './../models/Category'

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