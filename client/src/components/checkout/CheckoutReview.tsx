import { useState, useEffect } from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { IoIosHome } from 'react-icons/io'
import { MdDeliveryDining } from 'react-icons/md'
import { getDataAPI } from '../../utils/fetchData'

const CheckoutReview = () => {
  const [paymentMethod, setPaymentMethod] = useState('cc')
  const [paymentData, setPaymentData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvv: '',
    phoneNumber: ''
  })

  const [accountData, setAccountData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: ''
  })

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
  const [provinceName, setProvinceName] = useState('')
  const [cityName, setCityName] = useState('')

  useEffect(() => {
    const tempAccountData = JSON.parse(localStorage.getItem('sneakershub_recipient') as string)
    setAccountData(tempAccountData)
  }, [])

  useEffect(() => {
    const tempPaymentData = JSON.parse(localStorage.getItem('sneakershub_payment') as string)
    setPaymentMethod(tempPaymentData.paymentMethod)
    setPaymentData({
      nameOnCard: tempPaymentData.nameOnCard,
      cardNumber: tempPaymentData.cardNumber,
      expireMonth: tempPaymentData.expireMonth,
      expireYear: tempPaymentData.expireYear,
      cvv: tempPaymentData.cvv,
      phoneNumber: tempPaymentData.phoneNumber
    })
  }, [])

  useEffect(() => {
    const tempShippingData = JSON.parse(localStorage.getItem('sneakershub_shipping') as string)
    setShippingData(tempShippingData)
  }, [])

  useEffect(() => {
    if (shippingData.province) {
      getDataAPI(`courier/province/${shippingData.province}`)
        .then(res => {
          setProvinceName(res.data.province.rajaongkir.results.province)
        })
    }
  }, [shippingData.province])

  useEffect(() => {
    if (shippingData.city) {
      getDataAPI(`courier/city/detail/${shippingData.city}`)
        .then(res => {
          console.log(res.data.city)
          setCityName(res.data.city.rajaongkir.results.city_name)
        })
    }
  }, [shippingData.city])

  return (
    <div className='mt-8 font-opensans overflow-auto md:h-[70vh] hide-scrollbar'>
      <h1 className='text-2xl mb-6'>Review Order</h1>
      <div>
        <p className='mb-3 text-gray-500 font-bold'>Recipient</p>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <label
              htmlFor='name'
              className='text-sm'
            >
              Name
            </label>
            <input
              type='text'
              disabled
              value={accountData.recipientName}
              className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
            />
          </div>
          <div>
            <label
              htmlFor='phone'
              className='text-sm'
            >
              Phone
            </label>
            <input
              type='text'
              disabled id='phone'
              value={accountData.recipientPhone}
              className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='text-sm'
            >
              Email
            </label>
            <input
              type='text'
              disabled
              value={accountData.recipientEmail}
              className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <p className='mb-4 text-gray-500 font-bold'>Shipping</p>
        <div>
          <p className='flex items-center gap-3 text-sm mb-3'>
            <GrMapLocation />
            {provinceName}, {cityName}, {shippingData.district}, {shippingData.postalCode}
          </p>
          <p className='flex items-center gap-3 text-sm mb-3'>
            <IoIosHome />
            {shippingData.address}
          </p>
          <p className='capitalize flex items-center gap-3 text-sm'>
            <MdDeliveryDining className='text-md' />
            {shippingData.expedition} - {shippingData.expeditionService}
          </p>
        </div>
      </div>
      <div className='mt-8'>
        <p className='mb-3 text-gray-500 font-bold'>Payment Detail</p>
        <div className='border border-gray-300 w-fit p-2 rounded-md mb-4'>
          <img src={paymentMethod === 'cc' ? `${process.env.PUBLIC_URL}/images/cc.png` : `${process.env.PUBLIC_URL}/images/ovo.png`} alt='Sneakershub Payment' width={60} />
        </div>
        {
          paymentMethod === 'cc'
          ? (
            <>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex-1'>
                  <label
                    htmlFor='nameOnCard'
                    className='text-sm'
                  >
                    Name on Card
                  </label>
                  <input
                    type='text'
                    disabled
                    value={paymentData.nameOnCard}
                    className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
                  />
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='cardNumber'
                    className='text-sm'
                  >
                    Card Number
                  </label>
                  <input
                    type='text'
                    disabled 
                    value={paymentData.cardNumber}
                    className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
                  />
                </div>
              </div>
              <div className='flex items-center justify-between gap-4 mt-5'>
                <div className='flex-1'>
                  <label
                    htmlFor='expirationDate'
                    className='text-sm'
                  >
                    Expiration Date
                  </label>
                  <input
                    type='text'
                    disabled 
                    value={`${paymentData.expireMonth}/${paymentData.expireYear}`}
                    className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
                  />
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='cvv'
                    className='text-sm'
                  >
                    CVV
                  </label>
                  <input
                    type='text'
                    disabled
                    value={paymentData.cvv}
                    className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
                  />
                </div>
              </div>
            </>
          )
          : (
            <div className='flex-1'>
              <label
                htmlFor='nameOnCard'
                className='text-sm'
              >
                Phone Number
              </label>
              <input
                type='text'
                disabled
                value={paymentData.phoneNumber}
                className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2'
              />
            </div>
          )
        }
      </div>
      <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] text-sm text-white rounded-full px-5 py-2 mt-6 float-right'>Checkout</button>
      <div className='clear-both' />
    </div>
  )
}

export default CheckoutReview