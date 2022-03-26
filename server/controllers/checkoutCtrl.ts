import { Request, Response } from 'express'
import { createOvoTransaction, getChargeStatus } from './../utils/paymentHelper'
import Checkout from './../models/Checkout'
import Cart from './../models/Cart'
import { IReqUser } from '../utils/Interface'

const Pagination = (req: Request) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8
  const skip = (page - 1) * limit
  return { page, skip, limit }
}

const checkoutCtrl = {
  createCheckout: async(req: IReqUser, res: Response) => {
    try {
      const {
        recipientName,
        recipientPhone,
        recipientEmail,
        province,
        city,
        district,
        postalCode,
        address,
        expedition,
        expeditionService,
        expeditionFee,
        estimatedDay,
        paymentMethod,
        nameOnCard,
        cardNumber,
        expireMonth,
        expireYear,
        cvv,
        ovoPhoneNumber,
        discount,
        items,
        totalPrice
      } = req.body

      if (
        !recipientName ||
        !recipientPhone ||
        !recipientEmail ||
        !province ||
        !city ||
        !district ||
        !postalCode ||
        !address ||
        !expedition ||
        !expeditionService ||
        !expeditionFee ||
        !estimatedDay ||
        !paymentMethod
      ) {
        return res.status(400).json({ msg: 'Please fill every information on the checkout page.' })
      }

      if (paymentMethod === 'cc') {
        if (!nameOnCard || !cardNumber || !expireMonth || !expireYear || !cvv) {
          return res.status(400).json({ msg: 'Please provide credit card information to support the payment process.' })
        }
      } else if (paymentMethod === 'ovo') {
        if (!ovoPhoneNumber) {
          return res.status(400).json({ msg: 'Please provide OVO phone numebr to support the payment process.' })
        }
      } else {
        return res.status(400).json({ msg: `${paymentMethod} payment method not supported.` })
      }

      const newCheckout = new Checkout({
        user: req.user!._id,
        recipientName,
        recipientPhone,
        recipientEmail,
        province,
        city,
        district,
        postalCode,
        address,
        expedition,
        expeditionService,
        expeditionFee,
        estimatedDay,
        paymentMethod,
        nameOnCard: paymentMethod === 'cc' ? nameOnCard : '',
        cardNumber: paymentMethod === 'cc' ? cardNumber : '',
        expireMonth: paymentMethod === 'cc' ? expireMonth : '',
        expireYear: paymentMethod === 'cc' ? expireYear : '',
        cvv: paymentMethod === 'cc' ? cvv : '',
        ovoPhoneNumber: paymentMethod === 'ovo' ? ovoPhoneNumber : '',
        discount,
        items,
        totalPrice,
        chargeId: ''
      })

      if (paymentMethod === 'ovo') {
        const transaction = await createOvoTransaction(totalPrice, '+' + ovoPhoneNumber, newCheckout._id)
        // @ts-ignore
        newCheckout.chargeId = transaction.id
        // @ts-ignore
        newCheckout.status = transaction.status
      }

      await newCheckout.save()

      await Cart.deleteMany({ user: req.user!._id })

      return res.status(200).json({
        msg: 'Cart has been checkout successfully.',
        checkout: newCheckout
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getCheckoutHistory: async(req: IReqUser, res: Response) => {
    try {
      const checkouts = await Checkout.find({ user: req.user!._id }).sort('-createdAt').populate('items.product')
      return res.status(200).json({ checkouts })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getPaymentStatus: async(req: Request, res: Response) => {
    try {
      const paymentStatus = await getChargeStatus(req.params.id)
      return res.status(200).json({ status: paymentStatus })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getAllTransactions: async(req: Request, res: Response) => {
    try {
      const { skip, limit } = Pagination(req)

      const transactions = await Checkout.find().sort('-createdAt').skip(skip).limit(limit).populate('items.product')
      const transactionCount = await Checkout.find().countDocuments()
      let totalPage = 0

      if (transactions.length === 0) {
        totalPage = 0
      } else {
        if (transactionCount % limit === 0) {
          totalPage = transactionCount / limit
        } else {
          totalPage = Math.floor(transactionCount / limit) + 1
        }
      }

      return res.status(200).json({ transactions, totalPage })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default checkoutCtrl