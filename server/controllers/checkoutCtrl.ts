import { Request, Response } from 'express'
import { createOvoTransaction } from './../utils/paymentHelper'
import Checkout from './../models/Checkout'

const checkoutCtrl = {
  createCheckout: async(req: Request, res: Response) => {
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
        const transaction = await createOvoTransaction(totalPrice, ovoPhoneNumber, newCheckout._id)
        // @ts-ignore
        newCheckout.chargeId = transaction.id
        // @ts-ignore
        newCheckout.status = transaction.status
      }

      return res.status(200).json({
        msg: 'Cart has been checkout successfully.',
        checkout: newCheckout
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default checkoutCtrl