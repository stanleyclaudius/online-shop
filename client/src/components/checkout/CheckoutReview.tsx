import { GrMapLocation } from 'react-icons/gr'
import { IoIosHome } from 'react-icons/io'

const CheckoutReview = () => {
  return (
    <div className='mt-8 font-opensans overflow-auto md:h-[70vh] hide-scrollbar'>
      <h1 className='text-2xl mb-6'>Review Order</h1>
      <div>
        <p className='mb-3 text-gray-500 font-bold'>Recipient</p>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <label htmlFor='name' className='text-sm'>Name</label>
            <input type='text' disabled id='name' value='Lorem Ipsum' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
          <div>
            <label htmlFor='phone' className='text-sm'>Phone</label>
            <input type='text' disabled id='phone' value='081282822928' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
          <div>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input type='text' disabled id='email' value='lorem@ipsum.com' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <p className='mb-4 text-gray-500 font-bold'>Shipping</p>
        <div>
          <p className='flex items-center gap-3 text-sm mb-3'>
            <GrMapLocation />
            North Sumatra, Medan, Medan Area, 20216
          </p>
          <p className='flex items-center gap-3 text-sm'>
            <IoIosHome />
            Jln. Lorem Ipsum Dolor, No. 25AB
          </p>
        </div>
      </div>
      <div className='mt-8'>
        <p className='mb-4 text-gray-500 font-bold'>Payment Detail</p>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex-1'>
            <label htmlFor='nameOnCard' className='text-sm'>Name on Card</label>
            <input type='text' disabled id='nameOnCard' value='Lorem Ipsum' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
          <div className='flex-1'>
            <label htmlFor='cardNumber' className='text-sm'>Card Number</label>
            <input type='text' disabled id='cardNumber' value='Lorem Ipsum' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
        </div>
        <div className='flex items-center justify-between gap-4 mt-5'>
          <div className='flex-1'>
            <label htmlFor='expirationDate' className='text-sm'>Expiration Date</label>
            <input type='text' disabled id='expirationDate' value='03/22' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
          <div className='flex-1'>
            <label htmlFor='cvv' className='text-sm'>CVV</label>
            <input type='text' disabled id='cvv' value='123' className='w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm mt-2' />
          </div>
        </div>
      </div>
      <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] text-sm text-white rounded-full px-5 py-2 mt-6 float-right'>Checkout</button>
      <div className='clear-both' />
    </div>
  )
}

export default CheckoutReview