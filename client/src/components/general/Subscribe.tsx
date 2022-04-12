import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { HiMail } from 'react-icons/hi'
import { FormSubmit } from '../../utils/Interface'
import { ALERT } from '../../redux/types/alertTypes'
import { createSubscriber } from './../../redux/actions/subscriberActions'
import { validateEmail } from '../../utils/validateEmail'

const Subscribe = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!email) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide email address to subscribe.'
        }
      })
    }

    if (!validateEmail(email)) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide correct email format.'
        }
      })
    }

    await dispatch(createSubscriber(email))
    setEmail('')
  }

  return (
    <div className='bg-gray-200 px-10 pt-28 pb-12 text-center -mt-[90px]'>
      <h1 className='font-oswald text-xl tracking-wider font-bold'>SUBSCRIBE TO OUR NEWSLETTER</h1>
      <p className='text-gray-500 text-sm my-7 w-full max-w-[450px] m-auto'>Subscribe to our newsletter to get the latest news from <strong>sneakersku</strong> about store discount and event.</p>
      <form onSubmit={handleSubmit} className='flex items-center justify-between drop-shadow-2xl bg-white w-full max-w-[400px] rounded-full m-auto pl-2 pr-4 py-2'>
        <input
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-transparent px-3 outline-0 font-opensans w-full'
        />
        <HiMail className='text-blue-700 text-xl' />
      </form>
    </div>
  )
}

export default Subscribe