import { useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import Navbar from './../components/general/Navbar'
import Account from './../components/checkout/Account'
import Shipping from './../components/checkout/Shipping'
import Payment from './../components/checkout/Payment'
import CheckoutReview from './../components/checkout/CheckoutReview'
import CheckoutLine from './../components/checkout/CheckoutLine'
import Footer from './../components/general/Footer'

const Checkout = () => {
  const [currPage, setCurrPage] = useState('account')
  
  return (
    <>
      <Navbar />
      <div className='flex flex-col md:flex-row flex-col-reverse'>
        <div className='flex-[2] lg:mx-40 lg:my-12 md:mx-12 md:my-12 m-12'>
          <CheckoutLine setCurrPage={setCurrPage} />
          {
            currPage === 'account'
            ? <Account />
            : currPage === 'shipping'
              ? <Shipping />
              : currPage === 'payment'
                ? <Payment />
                : currPage === 'review'
                  ? <CheckoutReview />
                  : ''
          }
        </div>
        <div className='flex-1 md:border-l border-gray-300 font-opensans sm:border-b'>
          <h1 className='text-xl p-7'>Order Summary</h1>
          <div className='border-b border-gray-300 px-7 max-h-[240px] overflow-auto hide-scrollbar'>
            <div className='font-opensans text-black flex items-center mb-6'>
              <div className='w-20 h-24 bg-gray-300 flex items-center justify-center p-2'>
                <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="" />
              </div>
              <div className='ml-3'>
                <h2 className='font-oswald text-lg tracking-wide'>Product name goes here</h2>
                <p className='mt-1 mb-2 text-sm'>IDR 500K</p>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-2'>
                    <div className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0] transition-[background]'>-</div>
                    <input type='text' value={2} disabled className='w-[40px] rounded-md bg-gray-100 border border-gray-300 text-center text-sm' />
                    <div className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0] transition-[background]'>+</div>
                  </div>
                  <IoMdTrash className='text-red-500 text-xl cursor-pointer' />
                </div>
              </div>
            </div>
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
              <p>IDR 500K</p>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <p>Discount</p>
              <p>- IDR 15K</p>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <p>Shipping</p>
              <p>IDR 25K</p>
            </div>
            <div className='font-bold flex items-center justify-between'>
              <p>Total</p>
              <p>IDR 510K</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Checkout