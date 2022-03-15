import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './../components/general/Navbar'
import Account from './../components/checkout/Account'
import Shipping from './../components/checkout/Shipping'
import Payment from './../components/checkout/Payment'
import CheckoutReview from './../components/checkout/CheckoutReview'
import CheckoutLine from './../components/checkout/CheckoutLine'
import Footer from './../components/general/Footer'
import { RootStore } from '../utils/Interface'
import { numberFormatter } from '../utils/numberFormatter'

const Checkout = () => {
  const [currPage, setCurrPage] = useState('account')

  const [shippingCost, setShippingCost] = useState(0)

  const { cart } = useSelector((state: RootStore) => state)

  useEffect(() => {
    const checkStorage = () => {
      const tempShippingData = JSON.parse(localStorage.getItem('sneakershub_shipping') as string)
      if (tempShippingData) {
        setShippingCost(tempShippingData.courierFee)
      }
    }

    window.addEventListener('storage', checkStorage)
    return () => window.removeEventListener('storage', checkStorage)
  }, [])

  useEffect(() => {
    const tempShippingData = JSON.parse(localStorage.getItem('sneakershub_shipping') as string)
    if (tempShippingData) {
      setShippingCost(tempShippingData.courierFee)
    }
  }, [])
  
  return (
    <>
      <Navbar />
      <div className='flex flex-col md:flex-row flex-col-reverse'>
        <div className='flex-[2] lg:mx-40 lg:my-12 md:mx-12 md:my-12 m-12'>
          <CheckoutLine setCurrPage={setCurrPage} />
          {
            currPage === 'account'
            ? <Account setCurrPage={setCurrPage} />
            : currPage === 'shipping'
              ? <Shipping setCurrPage={setCurrPage} />
              : currPage === 'payment'
                ? <Payment setCurrPage={setCurrPage} />
                : currPage === 'review'
                  ? <CheckoutReview />
                  : ''
          }
        </div>
        <div className='flex-1 md:border-l border-gray-300 font-opensans sm:border-b'>
          <h1 className='text-xl p-7'>Order Summary</h1>
          <div className='border-b border-gray-300 px-7 max-h-[240px] overflow-auto hide-scrollbar'>
            {
              cart.map(item => (
                <div className='font-opensans text-black flex items-center mb-6'>
                  <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div className='ml-3'>
                    <h2 className='font-oswald text-lg tracking-wide'>{item.product.name}</h2>
                    <p className='mt-1 mb-2 text-sm'>{numberFormatter(item.product.price)} x {item.qty}</p>
                    <div className='flex items-center gap-4'>
                      <div className='rounded-full w-5 h-5' style={{ background: item.color }} />
                      <p className='rounded-md bg-gray-200 px-2 py-1 text-xs w-fit'>{item.size}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='px-7 py-5 border-b border-gray-300'>
            <p className='text-gray-500 mb-4'>Gift Card / Discount Code</p>
            <div className='flex font-opensans gap-3'>
              <input
                type='text'
                className='border border-gray-300 rounded-md p-2 outline-0 text-sm flex-[3]'
              />
              <button className='text-sm rounded-md text-white bg-[#3552DC] hover:bg-[#122DB0] transition-[background] flex-1'>Apply</button>
            </div>
          </div>
          <div className='px-7 py-5 flex flex-col gap-2'>
            <div className='flex items-center justify-between text-sm'>
              <p>Subtotal</p>
              <p>{numberFormatter(cart.reduce((acc, item) => (acc + (item.product ? (item.product.price - ((item.product.discount * item.product.price) / 100)) * item.qty : parseInt(item.price) * item.qty)), 0))}</p>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <p>Discount</p>
              <p>- IDR 15K</p>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <p>Shipping</p>
              <p>{numberFormatter(shippingCost)}</p>
            </div>
            <div className='font-bold flex items-center justify-between'>
              <p>Total</p>
              <p>
              {numberFormatter(cart.reduce((acc, item) => (acc + (item.product ? (item.product.price - ((item.product.discount * item.product.price) / 100)) * item.qty : parseInt(item.price) * item.qty)), 0) + shippingCost)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Checkout