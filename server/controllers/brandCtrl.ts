import { Request, Response } from 'express'
import Brand from './../models/Brand'

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
  }
}

export default brandCtrl