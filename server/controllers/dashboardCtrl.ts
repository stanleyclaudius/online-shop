import { Request, Response } from 'express'
import User from './../models/User'
import Checkout from './../models/Checkout'
import Product from './../models/Product'
import Brand from './../models/Brand'
import Category from './../models/Category'

type monthlyData = {
  month: string
  count: number
}

const dashboardCtrl = {
  getDashboardData: async(req: Request, res: Response) => {
    try {
      const totalUser  = await User.find({ role: { $ne: 'admin' } }).countDocuments()
      const totalTransaction = await Checkout.find().countDocuments()
      const totalProduct = await Product.find().countDocuments()
      const totalBrand = await Brand.find().countDocuments()
      const totalCategory = await Category.find().countDocuments()
      
      const transactionData = await Checkout.find({ $year: { createdAt: new Date().toISOString() } })
      const transactionMonth: string[] = []
      const monthlyTransaction: monthlyData[] = []

      transactionData.forEach(item => {
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(item.createdAt)
        if (!transactionMonth.includes(monthName)) {
          transactionMonth.push(monthName)
          monthlyTransaction.push({month: monthName, count: 0})
        }
      })

      transactionData.forEach(item => {
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(item.createdAt)
        monthlyTransaction.forEach(data => {
          if (data.month === monthName) {
            data.count++
          }
        })
      })

      const userData = await User.find({ role: { $ne: 'admin' }, $year: { createdAt: new Date().toISOString()} })
      const userMonth: string[] = []
      const userGrowth: monthlyData[] = []

      userData.forEach(item => {
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(item.createdAt)
        if (!userMonth.includes(monthName)) {
          userMonth.push(monthName)
          userGrowth.push({month: monthName, count: 0})
        }
      })

      userData.forEach(item => {
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(item.createdAt)
        userGrowth.forEach(data => {
          if (data.month === monthName) {
            data.count++
          }
        })
      })

      return res.status(200).json({
        totalUser,
        totalTransaction,
        totalProduct,
        totalBrand,
        totalCategory,
        monthlyTransaction,
        userGrowth
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default dashboardCtrl