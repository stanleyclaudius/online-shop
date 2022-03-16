import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setShipping } from '../../redux/actions/shippingActions'
import { ALERT } from '../../redux/types/alertTypes'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { numberFormatter } from '../../utils/numberFormatter'
import { InputChange, FormSubmit } from './../../utils/Interface'

interface IProvinceData {
  province_id: string
  province: string
}

interface ICityData {
  city_id: string
  city_name: string
  postal_code: string
  province: string
  province_id: string
  type: string
}

interface IExpeditionServiceCostData {
  value: number
  note: string
  etd: string
}

interface IExpeditionServiceDescData {
  service: string
  description: string
  cost: IExpeditionServiceCostData[]
}

interface IExpeditionServiceData {
  code: string
  costs: IExpeditionServiceDescData[]
  name: string
}

interface IProps {
  setCurrPage: React.Dispatch<React.SetStateAction<string>>
}

const Shipping: React.FC<IProps> = ({ setCurrPage }) => {
  const [shippingData, setShippingData] = useState({
    province: '',
    city: '',
    district: '',
    postalCode: '',
    address: '',
    expedition: '',
    expeditionService: '',
    courierFee: 0,
    estimatedDay: ''
  })
  const [provinceData, setProvinceData] = useState<IProvinceData[]>([])
  const [cityData, setCityData] = useState<ICityData[]>([])
  const [expeditionService, setExpeditionService] = useState<IExpeditionServiceData[]>([])

  const dispatch = useDispatch()

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setShippingData({ ...shippingData, [name]: value })
  }
  
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (
      !shippingData.province ||
      !shippingData.city ||
      !shippingData.district ||
      !shippingData.postalCode ||
      !shippingData.address ||
      !shippingData.expedition ||
      !shippingData.expeditionService ||
      !shippingData.courierFee ||
      !shippingData.estimatedDay
    ) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide all shipping information.'
        }
      })
    }

    dispatch(setShipping(shippingData))
    setCurrPage('payment')
  }

  const handleClickService = (expeditionService: string, estimatedDay: string, courierFee: number) => {
    setShippingData({ ...shippingData, expeditionService, courierFee, estimatedDay })
  }

  useEffect(() => {
    getDataAPI('courier/province')
      .then(res => {
        setProvinceData(res.data.province.rajaongkir.results)
      })
  }, [])

  useEffect(() => {
    if (shippingData.province) {
      getDataAPI(`courier/city/${shippingData.province}`)
        .then(res => {
          setCityData(res.data.city.rajaongkir.results)
        })
    }

    return () => setCityData([])
  }, [shippingData.province])

  useEffect(() => {
    if (shippingData.province && shippingData.city && shippingData.expedition) {
      postDataAPI('courier/cost', {
        origin: '152',
        destination: shippingData.city,
        weight: 1000,
        expedition: shippingData.expedition
      })
        .then(res => {
          setExpeditionService(res.data.cost.rajaongkir.results)
        })
    }

    return () => setExpeditionService([])
  }, [shippingData.province, shippingData.city, shippingData.expedition])

  useEffect(() => {
    const tempShippingData = JSON.parse(localStorage.getItem('sneakershub_shipping') as string)
    if (tempShippingData) {
      setShippingData(tempShippingData)
    }
  }, [])

  return (
    <div className='mt-8 font-opensans md:h-[70vh] overflow-auto hide-scrollbar'>
      <h1 className='text-2xl mb-6'>Shipping</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center gap-7'>
          <div className='mb-6 flex-1'>
            <label
              htmlFor='province'
              className='text-gray-500'
            >
              Province
            </label>
            <select
              id='province'
              name='province'
              value={shippingData.province}
              onChange={handleChange}
              className='w-full outline-0 p-2 rounded-md border border-gray-300 bg-white mt-3 text-sm'
            >
              <option value=''>- Select Province -</option>
              {
                provinceData.map(item => (
                  <option key={item.province_id} value={item.province_id}>{item.province}</option>
                ))
              }
            </select>
          </div>
          <div className='mb-6 flex-1'>
            <label
              htmlFor='city'
              className='text-gray-500'
            >
              City
            </label>
            <select
              id='city'
              name='city'
              value={shippingData.city}
              onChange={handleChange}
              className='w-full outline-0 p-2 rounded-md border border-gray-300 bg-white mt-3 text-sm'
            >
              <option value=''>- Select City -</option>
              {
                cityData.map(item => (
                  <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='mb-6 flex-1'>
            <label
              htmlFor='district'
              className='text-gray-500'
            >
              District
            </label>
            <input
              type='text'
              autoComplete='off'
              id='district'
              name='district'
              value={shippingData.district}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
            />
          </div>
          <div className='mb-6 flex-1'>
            <label
              htmlFor='city'
              className='text-gray-500'
            >
              Postal Code
            </label>
            <input
              type='text'
              autoComplete='off'
              id='postalCode'
              name='postalCode'
              value={shippingData.postalCode}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
            />
          </div>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='address'
            className='text-gray-500'
          >
            Address
          </label>
          <textarea
            id='address'
            name='address'
            value={shippingData.address}
            onChange={handleChange}
            className='w-full border border-gray-300 outline-0 rounded-md mt-3 text-sm p-2 resize-none'
          />
        </div>
        <div>
          <p className='text-gray-500'>Select Expedition</p>
          <div className='flex items-center gap-16 mt-4'>
            <div className='flex items-center gap-3'>
              <input
                type='radio'
                name='expedition'
                id='jne'
                value='jne'
                onChange={handleChange}
                checked={shippingData.expedition === 'jne' ? true : false}
              />
              <label htmlFor='jne'>
                <img src={`${process.env.PUBLIC_URL}/images/jne.png`} alt='JNE' width={50} />
              </label>
            </div>
            <div className='flex items-center gap-3'>
              <input
                type='radio'
                name='expedition'
                id='pos'
                value='pos'
                onChange={handleChange}
                checked={shippingData.expedition === 'pos' ? true : false}
              />
              <label htmlFor='pos'>
                <img src={`${process.env.PUBLIC_URL}/images/pos.png`} alt='POS Indonesia' width={50} />
              </label>
            </div>
            <div className='flex items-center gap-3'>
              <input
                type='radio'
                name='expedition'
                id='tiki'
                value='tiki'
                onChange={handleChange}
                checked={shippingData.expedition === 'tiki' ? true : false}
              />
              <label htmlFor='tiki'>
                <img src={`${process.env.PUBLIC_URL}/images/tiki.png`} alt='Tiki' width={50} />
              </label>
            </div>
          </div>
        </div>
        {
          expeditionService.length > 0 &&
          <div className='mt-6'>
            <p className='text-gray-500'>Select Expdition Service</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
              {
                expeditionService[0].costs.map((item, idx) => (
                  <div
                    onClick={() => handleClickService(item.service, item.cost[0].etd, item.cost[0].value)}
                    key={idx}
                    className={`border w-full py-3 px-5 rounded-md text-sm cursor-pointer ${item.service === shippingData.expeditionService ? 'border-blue-500 border-2' : 'border-gray-300'}`}
                  >
                    <p className='mb-2'>{item.service} ({item.description})</p>
                    <p className='mb-2'>{item.cost[0].etd} Day</p>
                    <p>{numberFormatter(item.cost[0].value)}</p>
                  </div>
                ))
              }
            </div>
          </div>
        }
        <button className='mt-6 bg-[#3552DC] hover:bg-[#122DB0] transition-[background] rounded-md text-sm text-white px-7 py-2'>
          Proceed to Payment
        </button>
      </form>
    </div>
  )
}

export default Shipping