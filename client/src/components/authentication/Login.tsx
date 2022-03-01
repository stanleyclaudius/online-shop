import React, { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { BiLock } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite'
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite'
import { FormSubmit, InputChange } from './../../utils/Interface'
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from './../../utils/constant'

interface IProps {
  setOpenAuthenticationModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FC<IProps> = ({ setOpenAuthenticationModal }) => {
  const [userData, setUserData] = useState({ username: '', password: '' })

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  const onGoogleSuccess = (response: GoogleLoginResponse) => {}

  const onFacebookSuccess = (response: FacebookLoginAuthResponse) => {}

  return (
    <div className='font-opensans'>
      <div className='flex items-center justify-between border-b border-gray-300 px-7 py-4'>
        <h1 className='font-medium text-xl'>Sign In</h1>
        <AiOutlineClose className='text-lg cursor-pointer' onClick={() => setOpenAuthenticationModal(false)} />
      </div>
      <div className='flex items-center justify-between gap-6 p-7'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='username'>Username</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <FaRegUser className='text-gray-400 text-sm' />
                <input className='pl-3 w-full outline-none text-sm' type='text' id='username' name='username' value={userData.username} onChange={handleChange} autoComplete='off' />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor='password'>Password</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <BiLock className='text-gray-400 text-lg' />
                <input type='password' id='password' name='password' value={userData.password} onChange={handleChange} className='pl-3 w-full outline-none text-sm' />
              </div>
              <p className='text-sm text-gray-500 mt-2 cursor-pointer'>Forget password?</p>
            </div>
            <div className='flex items-center justify-between'>
              <button type='submit' className='bg-[#3552DC] text-white rounded-full px-5 py-2 text-sm hover:bg-[#122DB0] transition-[background]'>Sign In</button>
              <button className='text-sm'>Create Account</button>
            </div>
          </form>
          <div className='text-center mt-6'>
            <p className='text-sm text-gray-500 font-medium mb-4'>Or Sign In With</p>
            <div className='flex justify-center items-center'>
              <div className='w-fit'>
                <GoogleLogin
                  client_id={GOOGLE_CLIENT_ID}
                  cookiepolicy='single_host_origin'
                  onSuccess={onGoogleSuccess}
                />
              </div>
              <div className='ml-5'>
                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  onSuccess={onFacebookSuccess}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 hidden md:block'>
          <img src={`${process.env.PUBLIC_URL}/images/authentication.svg`} alt='sneakershub' />
        </div>
      </div>
    </div>
  )
}

export default Login