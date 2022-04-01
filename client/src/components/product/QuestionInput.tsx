import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createQna } from '../../redux/actions/qnaActions'
import { FormSubmit, RootStore } from '../../utils/Interface'
import Loader from '../general/Loader'
import { ALERT } from './../../redux/types/alertTypes'

interface IProps {
  id: string
  reply?: string
}

const QuestionInput: React.FC<IProps> = ({ id, reply }) => {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!question) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide qna content.'
        }
      })
    }

    const qnaData = {
      content: question,
      user: auth.user!,
      product: id,
      likes: [],
      createdAt: new Date().toISOString()
    }

    setLoading(true)
    if (reply) {
      await dispatch(createQna({ ...qnaData, reply }, auth.token!))
    } else {
      await dispatch(createQna(qnaData, auth.token!))
    }
    setLoading(false)
    setQuestion('')
  }

  return (
    <div className='flex gap-6 items-start flex-col md:flex-row'>
      <div className='flex gap-4'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'>
          <img src={auth.user?.avatar} alt={auth.user?.name} className='rounded-full' />
        </div>
        <p className='font-oswald tracking-wide'>{auth.user?.name}</p>
      </div>
      <div className='flex-1 w-full'>
        <form onSubmit={handleSubmit}>
          <textarea className='rounded-md p-3 text-sm w-full border border-gray-300 rounded-full resize-none h-24 outline-0' placeholder='Post your question here ...' value={question} onChange={e => setQuestion(e.target.value)} />
          <button
            disabled={loading ? true : false}
            className={`float-right ${loading ? 'bg-blue-300 hover:bg-blue-300 cursor-auto' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} text-sm text-white transition-[background] px-3 py-2 rounded-md mt-3 transition-[background]`}
          >
            {
              loading
              ? <Loader />
              : 'Post'
            }
          </button>
          <div className='clear-both' />
        </form>
      </div>
    </div>
  )
}

export default QuestionInput