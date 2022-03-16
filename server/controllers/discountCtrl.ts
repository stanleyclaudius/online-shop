import { Request, Response } from 'express'
import Discount from './../models/Discount'

const discountCtrl = {
  createDiscount: async(req: Request, res: Response) => {
    try {
      const { code, value } = req.body
      if (!code || !value)
        return res.status(400).json({ msg: 'Please provide discount code and it\'s value.' })
      
      if (code.length < 4)
        return res.status(400).json({ msg: 'Discount code should be at least 4 characters.' })

      if (value < 1 || value > 100)
        return res.status(400).json({ msg: 'Discount value should be in range of 0 and 100.' })

      const findDiscount = await Discount.findOne({ code })
      if (findDiscount)
        return res.status(400).json({ msg: `Discount with code ${code} has been used before.` })

      const newDiscount = new Discount({ code, value })
      await newDiscount.save()

      return res.status(200).json({
        msg: `Discount with code ${code} has been created successfully.`,
        discount: newDiscount
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getDiscount: async(req: Request, res: Response) => {
    try {
      const discounts = await Discount.find().sort('-createdAt')
      return res.status(200).json({ discounts })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getDiscountById: async(req: Request, res: Response) => {
    try {
      const discount = await Discount.findOne({ code: req.params.id })
      if (!discount)
        return res.status(404).json({ msg: `Discount with code ${req.params.id} not found.` })

      return res.status(200).json({ discount })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteDiscount: async(req: Request, res: Response) => {
    try {
      const discount = await Discount.findByIdAndDelete(req.params.id)
      if (!discount)
        return res.status(404).json({ msg: `Discount with ID ${req.params.id} not found.` })
      
      return res.status(200).json({ msg: `Discount with ID ${req.params.id} has been deleted successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateDiscount: async(req: Request, res: Response) => {
    try {
      const { code, value } = req.body
      if (!code || !value)
        return res.status(400).json({ msg: 'Please provide discount code and it\'s value.' })
      
      if (code.length < 4)
        return res.status(400).json({ msg: 'Discount code should be at least 4 characters.' })

      if (value < 1 || value > 100)
        return res.status(400).json({ msg: 'Discount value should be in range of 0 and 100.' })

      const findDiscount = await Discount.findOne({ _id: { $ne: req.params.id }, code })
      if (findDiscount)
        return res.status(400).json({ msg: `Discount with code ${code} has been used before.` })

      const discount = await Discount.findOneAndUpdate({ _id: req.params.id }, { code, value }, { new: true })
      if (!discount)
        return res.status(404).json({ msg: `Discount with ID ${req.params.id} not found.` })

      return res.status(200).json({
        msg: 'Discount has been updated successfully.',
        discount
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default discountCtrl