import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Brand from './../models/Brand'
import Category from './../models/Category'
import Product from './../models/Product'

const Pagination = (req: Request, defaultLimit: number) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || defaultLimit
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

const productCtrl = {
  createProduct: async(req: Request, res: Response) => {
    try {
      const { name, brand, category, colors, sizes, price, description, discount, images, stock, weight } = req.body

      if (
        !name ||
        !brand ||
        !category ||
        colors.length < 1 ||
        sizes.length < 1 ||
        !price ||
        !description ||
        images.length < 1 ||
        stock.length < 1 ||
        weight < 100
      )
        return res.status(400).json({ msg: 'Please fill every needed data to create a product.' })

      const newProduct = new Product({
        name,
        brand,
        category,
        colors,
        sizes,
        price,
        description,
        discount,
        images,
        stock,
        weight
      })
      await newProduct.save()

      const categoryDetail = await Category.findById(category)
      const brandDetail = await Brand.findById(brand)

      return res.status(200).json({
        msg: `${name} product has been created successfully.`,
        product: {
          ...newProduct._doc,
          category: categoryDetail,
          brand: brandDetail
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProduct: async(req: Request, res: Response) => {
    try {
      const { skip, limit } = Pagination(req, 8)
      const data = await Product.aggregate([
        {
          $facet: {
            totalData: [
              {
                $lookup: {
                  from: 'brands',
                  localField: 'brand',
                  foreignField: '_id',
                  as: 'brand'
                }
              },
              { $unwind: '$brand' },
              {
                $lookup: {
                  from: 'categories',
                  localField: 'category',
                  foreignField: '_id',
                  as: 'category'
                }
              },
              { $unwind: '$category' },
              { $sort: { createdAt: -1} },
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

      const products = data[0].totalData
      const productCount = data[0].count
      let totalPage = 0

      if (products.length === 0) {
        totalPage = 0
      } else {
        if (productCount % limit === 0) {
          totalPage = productCount / limit
        } else {
          totalPage = Math.floor(productCount / limit) + 1
        }
      }

      return res.status(200).json({ products, totalPage })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProductById: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id).populate('brand category')
      if (!product)
        return res.status(404).json({ msg: `Product with ID ${id} not found.` })

      return res.status(200).json({ product })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getHomeProduct: async(req: Request, res: Response) => {
    const { skip, limit } = Pagination(req, 9)

    const brandQuery = []
    if (req.query.brand) {
      if (typeof req.query.brand === 'string') {
        brandQuery.push(new mongoose.Types.ObjectId(req.query.brand))
      } else {
        for (let i = 0; i < `${req.query.brand}`.length; i++) {
          brandQuery.push(new mongoose.Types.ObjectId((req.query.brand as string[])[i]))
        }
      }
    }

    const sizeQuery = []
    if (req.query.sizes) {
      if (typeof req.query.sizes === 'string') {
        sizeQuery.push(parseInt(req.query.sizes))
      } else {
        for (let i = 0; i < `${req.query.sizes}`.length; i++) {
          sizeQuery.push(parseInt((req.query.sizes as string[])[i]))
        }
      }
    }

    const colorQuery = []
    if (req.query.colors) {
      if (typeof req.query.colors === 'string') {
        colorQuery.push('#' + req.query.colors)
      } else {
        for (let i = 0; i < `${req.query.colors}`.length; i++) {
          colorQuery.push('#' + (req.query.colors as string[])[i])
        }
      }
    }

    let categoryQuery: any = ''
    if (req.query.category) {
      categoryQuery = new mongoose.Types.ObjectId(`${req.query.category}`)
    }

    const dataAggregation: any[] = [
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
        $lookup: {
          'from': 'brands',
          'localField': 'brand',
          'foreignField': '_id',
          'as': 'brand'
        }
      },
      { $unwind: '$brand' },
      { $skip: skip },
      { $limit: limit }
    ]

    const countAggregation: any[] = [
      { $count: 'count' }
    ]

    if (brandQuery.length !== 0) {
      dataAggregation.unshift({
        $match: {
          brand: { $in: brandQuery }
        }
      })

      countAggregation.unshift({
        $match: {
          brand: { $in: brandQuery }
        }
      })
    }

    if (sizeQuery.length !== 0) {
      dataAggregation.unshift({
        $match: {
          sizes: { $in: sizeQuery }
        }
      })

      countAggregation.unshift({
        $match: {
          sizes: { $in: sizeQuery }
        }
      })
    }

    if (colorQuery.length !== 0) {
      dataAggregation.unshift({
        $match: {
          colors: { $in: colorQuery }
        }
      })

      countAggregation.unshift({
        $match: {
          colors: { $in: colorQuery }
        }
      })
    }

    if (categoryQuery) {
      dataAggregation.unshift({
        $match: { category: { $eq: categoryQuery } }
      })

      countAggregation.unshift({
        $match: { category: { $eq: categoryQuery } }
      })
    }

    if (req.query.gt) {
      dataAggregation.unshift({
        $match: { price: { $gte: parseInt(`${req.query.gt}`) } }
      })

      countAggregation.unshift({
        $match: { price: { $gte: parseInt(`${req.query.gt}`) } }
      })
    }

    if (req.query.lt) {
      dataAggregation.unshift({
        $match: { price: { $lte: parseInt(`${req.query.lt}`) } }
      })

      countAggregation.unshift({
        $match: { price: { $lte: parseInt(`${req.query.lt}`) } }
      })
    }

    if (req.query.sortBy) {
      if (req.query.sortBy === 'price') {
        if (req.query.sortType === 'asc') {
          dataAggregation.push({ $sort: { price: 1 } })
        } else if (req.query.sortType === 'desc') {
          dataAggregation.push({ $sort: { price: -1 } })
        }
      } else if (req.query.sortBy === 'date') {
        if (req.query.sortType === 'asc') {
          dataAggregation.push({ $sort: { createdAt: 1 } })
        } else if (req.query.sortType === 'desc') {
          dataAggregation.push({ $sort: { createdAt: -1 } })
        }
      }
    }

    try {
      const data = await Product.aggregate([
        {
          $facet: {
            totalData: dataAggregation,
            totalCount: countAggregation
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ['$totalCount.count', 0] },
            totalData: 1
          }
        }
      ])

      const products = data[0].totalData
      const totalProduct = data[0].count
      let totalPage = 0
        
      if (products.length === 0) {
        totalPage = 0
      } else {
        if (totalProduct % limit === 0)  {
          totalPage = totalProduct / limit
        } else {
          totalPage = Math.floor(totalProduct / limit) + 1
        }
      }

      const maxPrice = await Product.find().sort('-price').limit(1)
      const minPrice = await Product.find().sort('price').limit(1)

      return res.status(200).json({
        products,
        totalPage,
        maxPrice: maxPrice[0].price,
        minPrice: minPrice[0].price
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getSimilarProduct: async(req: Request, res: Response) => {
    const products = await Product.aggregate([
      { $match: { _id: { $nin: [new mongoose.Types.ObjectId(req.params.id)] } } },
      {
        $match: {
          category: { $eq: new mongoose.Types.ObjectId(req.params.category) }
        }
      },
      { $sample: { size: 7 } },
      { $lookup: { from: 'category', localField: 'category', foreignField: '_id', as: 'category' } },
      { $lookup: { from: 'brand', localField: 'brand', foreignField: '_id', as: 'brand' } }
    ])
    
    return res.status(200).json({ products })
  },
  deleteProduct: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await Product.findByIdAndDelete(id)
      if (!product)
        return res.status(404).json({ msg: `Product with ID ${id} not found.` })
      
      return res.status(200).json({ msg: `${product.name} product has been deleted successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateProduct: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name, brand, category, colors, sizes, price, description, discount, images, weight, stock } = req.body

      if (
        !name ||
        !brand ||
        !category ||
        colors.length < 1 ||
        sizes.length < 1 ||
        !price ||
        !description ||
        images.length < 1 ||
        stock.length < 1 ||
        weight < 100
      )
        return res.status(400).json({ msg: 'Please fill every needed data to create a product.' })

      const product = await Product.findOneAndUpdate({ _id: id }, {
        name, brand, category, colors, sizes, price, description, discount, images, stock, weight
      }, { new: true }).populate('category brand')
      if (!product)
        return res.status(404).json({ msg: 'Product not found.' })

      return res.status(200).json({
        msg: 'Product has been updated successfully.',
        product
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  searchProduct: async(req: Request, res: Response) => {
    try {
      const products = await Product.aggregate([
        {
          $search: {
            index: 'product',
            autocomplete: {
              'query': req.query.name,
              'path': 'name'
            }
          }
        },
        { $sort: { createdAt: -1 } }
      ])

      return res.status(200).json({ products })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default productCtrl