import { Request, Response } from 'express'
import request from 'request'

const courierCtrl = {
  getProvince: (req: Request, res: Response) => {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: { key: process.env.RAJAONGKIR_API_KEY }
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      res.status(200).json({ province: JSON.parse(body) })
    })
  },
  getProvinceById: (req: Request, res: Response) => {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      qs: { id: req.params.id },
      headers: { key: process.env.RAJAONGKIR_API_KEY }
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      res.status(200).json({ province: JSON.parse(body) })
    })
  },
  getCity: (req: Request, res: Response) => {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      qs: { province: req.params.province },
      headers: { key: process.env.RAJAONGKIR_API_KEY }
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      res.status(200).json({ city: JSON.parse(body) })
    })
  },
  getCityById: (req: Request, res: Response) => {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      qs: { id: req.params.id },
      headers: { key: process.env.RAJAONGKIR_API_KEY }
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      res.status(200).json({ city: JSON.parse(body) })
    })
  },
  getCost: (req: Request, res: Response) => {
    const options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {
        key: process.env.RAJAONGKIR_API_KEY,
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        origin: req.body.origin,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: req.body.expedition
      }
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      res.status(200).json({ cost: JSON.parse(body) })
    })
  }
}

export default courierCtrl