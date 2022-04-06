import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { FormSubmit } from './../../utils/Interface'
import { postDataAPI } from './../../utils/fetchData'
import { ALERT } from '../../redux/types/alertTypes'
import { validateEmail } from '../../utils/validateEmail'
import Loader from '../general/Loader'

interface IProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setOpenAuthenticationModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ForgotPassword: React.FC<IProps> = ({ setCurrentPage, setOpenAuthenticationModal }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!email) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide email address to reset password.'
        }
      })
    }

    if (!validateEmail(email)) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide valid email address.'
        }
      })
    }

    setLoading(true)
    
    try {
      const res = await postDataAPI('auth/forget', { email })
      dispatch({
        type: ALERT,
        payload: {
          success: res.data.msg
        }
      })
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: {
          errors: err.response.data.msg
        }
      })
    }

    setLoading(false)
    setOpenAuthenticationModal(false)
    setEmail('')
  }

  return (
    <div className='font-opensans'>
      <div className='flex items-center justify-between border-b border-gray-300 px-7 py-4'>
        <h1 className='font-medium text-xl'>Forgot Password</h1>
        <AiOutlineClose
          onClick={() => setOpenAuthenticationModal(false)}
          className='text-lg cursor-pointer'  
        />
      </div>
      <div className='flex items-center justify-between gap-6 p-7'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 mt-3'>
                <FaRegUser className='text-gray-400 text-sm' />
                <input
                  type='text'
                  autoComplete='off'
                  id='name'
                  name='name'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='pl-3 w-full outline-none text-sm'
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                disabled={loading ? true : false}
                className={`${loading ? 'bg-blue-200 hover:bg-blue-200 cursor-auto' : 'bg-[#3552DC] hover:bg-[#122DB0] cursor-pointer'} text-white rounded-full px-5 py-2 text-sm transition-[background]`}
              >
                {
                  loading
                  ? <Loader />
                  : 'Send'
                }
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
        <div className='flex-1'>
          <img src={`${process.env.PUBLIC_URL}/images/authentication.svg`} alt='sneakershub' />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword