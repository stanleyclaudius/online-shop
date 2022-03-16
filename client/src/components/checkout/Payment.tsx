import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ALERT } from './../../redux/types/alertTypes'
import { setCheckoutPayment } from './../../redux/actions/paymentMethodActions'
import { FormSubmit, InputChange } from './../../utils/Interface'

interface IProps {
  setCurrPage: React.Dispatch<React.SetStateAction<string>>
}

const Payment: React.FC<IProps> = ({ setCurrPage }) => {
  const [paymentMethod, setPaymentMethod] = useState('cc')
  const [paymentData, setPaymentData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvv: '',
    phoneNumber: ''
  })

  const dispatch = useDispatch()

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setPaymentData({ ...paymentData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (paymentMethod === 'cc') {
      if (
        !paymentData.nameOnCard ||
        !paymentData.cardNumber ||
        !paymentData.expireMonth ||
        !paymentData.expireYear ||
        !paymentData.cvv
      ) {
        return dispatch({
          type: ALERT,
          payload: {
            errors: 'Please fill up every field.'
          }
        })
      }

      dispatch(setCheckoutPayment({ ...paymentData, paymentMethod }))
      setCurrPage('review')
    } else if (paymentMethod === 'ovo') {
      if (!paymentData.phoneNumber) {
        return dispatch({
          type: ALERT,
          payload: {
            errors: 'Please provide your OVO phone number.'
          }
        })
      }

      localStorage.setItem('sneakershub_payment', JSON.stringify({ ...paymentData, paymentMethod }))
      setCurrPage('review')
    } else {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Payment method not available.'
        }
      })
    }
  }

  useEffect(() => {
    const tempPaymentData = JSON.parse(localStorage.getItem('sneakershub_payment') as string)
    if (tempPaymentData) {
      setPaymentMethod(tempPaymentData.paymentMethod)
      setPaymentData({
        nameOnCard: tempPaymentData.nameOnCard,
        cardNumber: tempPaymentData.cardNumber,
        expireMonth: tempPaymentData.expireMonth,
        expireYear: tempPaymentData.expireYear,
        cvv: tempPaymentData.cvv,
        phoneNumber: tempPaymentData.phoneNumber
      })
    }
  }, [])

  return (
    <div className='mt-8 font-opensans'>
      <h1 className='text-2xl mb-4'>Payment Details</h1>
      <div className='flex items-center mb-6 gap-4'>
        <div onClick={() => setPaymentMethod('cc')} className={`border rounded-md p-2 cursor-pointer ${paymentMethod === 'cc' ? 'border-blue-500 border-2' : 'border-gray-300'}`}>
          <img src={`${process.env.PUBLIC_URL}/images/cc.png`} alt='Sneakershub Payment' width={60} />
        </div>
        <div onClick={() => setPaymentMethod('ovo')} className={`border rounded-md p-2 cursor-pointer ${paymentMethod === 'ovo' ? 'border-blue-500 border-2' : 'border-gray-300'}`}>
          <img src={`${process.env.PUBLIC_URL}/images/ovo.png`} alt='Sneakershub Payment' width={60} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {
          paymentMethod === 'cc'
          ? (
            <>
              <div className='mb-6'>
                <label
                  htmlFor='nameOnCard'
                  className='text-gray-500'
                >
                  Name on Card
                </label>
                <input
                  type='text'
                  autoComplete='off'
                  id='nameOnCard'
                  name='nameOnCard'
                  value={paymentData.nameOnCard}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='cardNumber'
                  className='text-gray-500'
                >
                  Card Number
                </label>
                <input
                  type='text'
                  autoComplete='off'
                  id='cardNumber'
                  name='cardNumber'
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
                />
              </div>
              <div className='flex items-center gap-10 mb-8'>
                <div className='flex-1'>
                  <label
                    htmlFor='expiration'
                    className='text-gray-500'
                  >
                    Expiration (Month / Year)
                  </label>
                  <div className='flex items-center gap-3'>
                    <input
                      type='text'
                      name='expireMonth'
                      autoComplete='off'
                      value={paymentData.expireMonth}
                      onChange={handleChange}
                      className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
                    />
                    <p className='translate-y-1'>/</p>
                    <input
                      type='text'
                      name='expireYear'
                      autoComplete='off'
                      value={paymentData.expireYear}
                      onChange={handleChange}
                      className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
                    />
                  </div>
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='cvv'
                    className='text-gray-500'
                  >
                    CVV
                  </label>
                  <input
                    type='text'
                    autoComplete='off'
                    id='cvv'
                    name='cvv'
                    value={paymentData.cvv}
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
                  />
                </div>
              </div>
            </>
          )
          : (
            <div className='mb-6'>
              <label
                htmlFor='phoneNumber'
                className='text-gray-500'
              >
                OVO Phone Number
              </label>
              <input
                type='number'
                autoComplete='off'
                id='phoneNumber'
                name='phoneNumber'
                value={paymentData.phoneNumber}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
              />
            </div>
          )
        }
        <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] rounded-md text-sm text-white px-7 py-2'>Review Order</button>
      </form>
    </div>
  )
}

export default Payment