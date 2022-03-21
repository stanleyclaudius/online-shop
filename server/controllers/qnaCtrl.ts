import { Request, Response } from 'express'
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
  },
  getQna: async(req: Request, res: Response) => {
    try {
      const qnas = await Qna.find({ product: req.params.product }).populate('user')
      return res.status(200).json({ qnas })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  likeQna: async(req: IReqUser, res: Response) => {
    try {
      const qna = await Qna.findOneAndUpdate({ _id: req.params.id }, {
        $push: { likes: req.user?._id }
      }, { new: true })
      if (!qna)
        return res.status(404).json({ msg: `Qna with ID ${req.params.id} not found.` })

      return res.status(200).json({ msg: 'Qna liked.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unlikeQna: async(req: IReqUser, res: Response) => {
    try {
      const qna = await Qna.findOneAndUpdate({ _id: req.params.id }, {
        $pull: { likes: req.user?._id }
      }, { new: true })
      if (!qna)
        return res.status(404).json({ msg: `Qna with ID ${req.params.id} not found.` })

      return res.status(200).json({ msg: 'Qna unliked.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default qnaCtrl