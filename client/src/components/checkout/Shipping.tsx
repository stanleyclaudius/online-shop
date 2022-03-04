import { useState } from 'react'
import { InputChange, FormSubmit } from './../../utils/Interface'

const Shipping = () => {
  const [shippingData, setShippingData] = useState({
    province: '',
    city: '',
    district: '',
    postalCode: '',
    address: ''
  })

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setShippingData({ ...shippingData, [name]: value })
  }
  
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className='mt-8 font-opensans'>
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
            <select
              id='district'
              name='district'
              value={shippingData.district}
              onChange={handleChange}
              className='w-full outline-0 p-2 rounded-md border border-gray-300 bg-white mt-3 text-sm'
            >
              <option value=''>- Select District -</option>
            </select>
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
        <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] rounded-md text-sm text-white px-7 py-2'>Proceed to Payment</button>
      </form>
    </div>
  )
}

export default Shipping