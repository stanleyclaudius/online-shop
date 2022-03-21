import { Response } from 'express'
import { IReqUser } from './../utils/Interface'
import Qna from './../models/Qna'

const qnaCtrl = {
  createQna: async(req: IReqUser, res: Response) => {
    try {
      const { content, reply, product } = req.body
      if (!content || !product)
        return res.status(400).json({ msg: 'Please provide content and product id.'})

      const newQna = new Qna({
        content,
        reply,
        user: req.user?._id,
        product
      })
      await newQna.save()

      return res.status(200).json({ qna: newQna })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default qnaCtrl