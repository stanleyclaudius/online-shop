import { useState } from 'react'
import { InputChange, FormSubmit } from './../../utils/Interface'

const Account = () => {
  const [accountData, setAccountData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: ''
  })

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setAccountData({ ...accountData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className='mt-8 font-opensans'>
      <h1 className='text-2xl mb-6'>Account</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-6'>
          <label htmlFor='recipientName' className='text-gray-500'>Recipient Name</label>
          <input type='text' name='recipientName' id='recipientName' value={accountData.recipientName} onChange={handleChange} className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3' />
        </div>
        <div className='mb-6'>
          <label htmlFor='recipientPhone' className='text-gray-500'>Recipient Phone Number</label>
          <input type='text' name='recipientPhone' id='recipientPhone' value={accountData.recipientPhone} onChange={handleChange} className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3' />
        </div>
        <div className='mb-8'>
          <label htmlFor='recipientEmail' className='text-gray-500'>Recipient Email Address</label>
          <input type='text' name='recipientEmail' id='recipientEmail' value={accountData.recipientEmail} onChange={handleChange} className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3' />
        </div>
        <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] rounded-md text-sm text-white px-7 py-2'>Proceed to Shipping</button>
      </form>
    </div>
  )
}

export default Account