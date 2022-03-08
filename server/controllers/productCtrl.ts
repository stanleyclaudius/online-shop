import { Request, Response } from 'express'
import Product from './../models/Product'

const productCtrl = {
  createProduct: async(req: Request, res: Response) => {
    try {
      const { name, brand, category, colors, sizes, price, description, discount, images, stock } = req.body

      if (
        !name ||
        !brand ||
        !category ||
        colors.length < 1 ||
        sizes.length < 1 ||
        !price ||
        !description ||
        images.length < 1 ||
        stock.length < 1
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
        stock
      })
      await newProduct.save()

      return res.status(200).json({
        msg: `${name} product has been created successfully.`,
        product: newProduct
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProduct: async(req: Request, res: Response) => {
    try {
      const products = await Product.find().sort('-createdAt').populate('brand category')
      return res.status(200).json({ products })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
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
  }
}

export default productCtrl