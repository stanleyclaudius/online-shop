import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { BiLock } from 'react-icons/bi'
import { InputChange, FormSubmit } from './../../utils/Interface'

interface IProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setOpenAuthenticationModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Register: React.FC<IProps> = ({ setCurrentPage, setOpenAuthenticationModal }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className='font-opensans'>
      <div className='flex items-center justify-between border-b border-gray-300 px-7 py-4'>
        <h1 className='font-medium text-xl'>Sign Up</h1>
        <AiOutlineClose
          onClick={() => setOpenAuthenticationModal(false)}
          className='text-lg cursor-pointer'
        />
      </div>
      <div className='flex items-center justify-between gap-6 p-7'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='name'>Name</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <FaRegUser className='text-gray-400 text-sm' />
                <input
                  type='text'
                  autoComplete='off'
                  id='name'
                  name='name'
                  value={userData.name}
                  onChange={handleChange}
                  className='pl-3 w-full outline-none text-sm'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <FaRegUser className='text-gray-400 text-sm' />
                <input
                  type='text'
                  autoComplete='off'
                  id='email'
                  name='email'
                  value={userData.email}
                  onChange={handleChange}
                  className='pl-3 w-full outline-none text-sm'
                />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor='password'>Password</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <BiLock className='text-gray-400 text-lg' />
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={userData.password}
                  onChange={handleChange}
                  className='pl-3 w-full outline-none text-sm'
                />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor='passwordConfirmation'>Password Confirmation</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <BiLock className='text-gray-400 text-lg' />
                <input
                  type='password'
                  id='passwordConfirmation'
                  name='passwordConfirmation'
                  value={userData.passwordConfirmation}
                  onChange={handleChange}
                  className='pl-3 w-full outline-none text-sm'
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-[#3552DC] text-white rounded-full px-5 py-2 text-sm hover:bg-[#122DB0] transition-[background]'
              >
                Sign Up
              </button>
              <button
                onClick={() => setCurrentPage('login')}
                className='text-sm'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className='flex-1 hidden md:block'>
          <img src={`${process.env.PUBLIC_URL}/images/authentication.svg`} alt='sneakershub' />
        </div>
      </div>
    </div>
  )
}

export default Register