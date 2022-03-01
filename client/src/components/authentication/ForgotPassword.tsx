import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { FormSubmit } from './../../utils/Interface'

interface IProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setOpenAuthenticationModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ForgotPassword: React.FC<IProps> = ({ setCurrentPage, setOpenAuthenticationModal }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className='font-opensans'>
      <div className='flex items-center justify-between border-b border-gray-300 px-7 py-4'>
        <h1 className='font-medium text-xl'>Forgot Password</h1>
        <AiOutlineClose className='text-lg cursor-pointer' onClick={() => setOpenAuthenticationModal(false)} />
      </div>
      <div className='flex items-center justify-between gap-6 p-7'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <FaRegUser className='text-gray-400 text-sm' />
                <input className='pl-3 w-full outline-none text-sm' type='text' id='name' name='name' value={email} onChange={e => setEmail(e.target.value)} autoComplete='off' />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <button type='submit' className='bg-[#3552DC] text-white rounded-full px-5 py-2 text-sm hover:bg-[#122DB0] transition-[background]'>Send</button>
              <button className='text-sm' onClick={() => setCurrentPage('login')}>Sign In</button>
            </div>
          </form>
        </div>
        <div className='flex-1'>
          <img src={`${process.env.PUBLIC_URL}/images/authentication.svg`} alt='sneakershub' />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword