import { Response } from 'express'
import { IReqUser } from './../utils/Interface'
import Cart from './../models/Cart'
import Product from './../models/Product'

const cartCtrl = {
  addToCart: async(req: IReqUser, res: Response) => {
    try {
      const { product, color, size, qty } = req.body
      if (!product || !color || !size || !qty)
        return res.status(400).json({ msg: 'Please provide needed data for cart.' })
  
      const findProduct = await Product.findOne({ _id: product })
      if (!findProduct)
        return res.status(404).json({ msg: `Product with ID ${product} not found.` })
  
      const findCart = await Cart.findOne({ user: req.user!._id, product, color, size })
      if (findCart) {
        await Cart.findOneAndUpdate({ _id: findCart._id }, {
          qty
        }, { new: true })
      } else {
        const cart = new Cart({
          user: req.user!._id,
          product,
          color,
          size,
          qty
        })
        await cart.save()
      }
  
      return res.status(200).json({ msg: 'Item added to cart.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getCart: async(req: IReqUser, res: Response) => {
    try {
      const carts = await Cart.find({ user: req.user!._id }).populate('product')
      return res.status(200).json({ carts })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteCart: async(req: IReqUser, res: Response) => {
    try {
      const { productId, productColor, productSize } = req.params
      await Cart.findOneAndDelete({ user: req.user!._id, product: productId, color: '#' + productColor, size: productSize })
      return res.status(200).json({ msg: 'Item deleted.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default cartCtrl