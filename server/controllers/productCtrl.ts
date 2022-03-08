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
  }
}

export default productCtrl