import { Request, Response } from 'express'
import Banner from './../models/Banner'

const bannerCtrl = {
  getBanner: async(req: Request, res: Response) => {
    try {
      const banner = await Banner.find().populate('product', 'images price name')
      return res.status(200).json({ banner })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateBanner: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { product } = req.body
      if (!product)
        return res.status(400).json({ msg: 'Please choose product that want to be showcased at home page.' })

      const banner = await Banner.findOneAndUpdate({ _id: id }, { product }, { new: true }).populate('product', 'images price name')

      return res.status(200).json({
        msg: 'Banner has been updated successfully.',
        banner
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default bannerCtrl