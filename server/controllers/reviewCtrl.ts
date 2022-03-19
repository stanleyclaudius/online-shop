import { Response } from 'express'
import { IReqUser } from './../utils/Interface'
import Review from './../models/Review'
import Checkout from './../models/Checkout'

const reviewCtrl = {
  createReview: async(req: IReqUser, res: Response) => {
    try {
      const { star, content, product } = req.body
      if (!star || !content || !product)
        return res.status(400).json({ msg: 'Please provide every field.' })

      const checkHistory = await Checkout.find({ user: req.user?._id, "items.product": product })
      const historyLength = checkHistory.length

      const checkReview = await Review.find({ user: req.user?._id, product })
      const reviewLength = checkReview.length

      let eligibleStatus = false
      
      if (historyLength === 0)
        eligibleStatus = false
      else if (historyLength > 0 && (reviewLength !== historyLength))
        eligibleStatus = true
      else
        eligibleStatus = false

      if (!eligibleStatus)
        return res.status(400).json({ msg: 'You\'re not eligible to review this product.' })

      const newReview = new Review({
        user: req.user?._id,
        product,
        star,
        content
      })
      await newReview.save()

      return res.status(200).json({
        msg: 'Review has been created successfully.',
        review: newReview
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  checkReviewEligibility: async(req: IReqUser, res: Response) => {
    try {
      const checkHistory = await Checkout.find({ user: req.user?._id, "items.product": req.params.product })
      const historyLength = checkHistory.length

      const checkReview = await Review.find({ user: req.user?._id, product: req.params.product })
      const reviewLength = checkReview.length

      let eligibleStatus = false

      if (historyLength === 0)
        eligibleStatus = false
      else if (historyLength > 0 && (reviewLength !== historyLength))
        eligibleStatus = true
      else
        eligibleStatus = false

      return res.status(200).json({ status: eligibleStatus })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default reviewCtrl