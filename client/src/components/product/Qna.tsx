import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillHeart } from 'react-icons/ai'
import { MdReplyAll } from 'react-icons/md'
import { IQnaData } from '../../redux/types/qnaTypes'
import QuestionInput from './QuestionInput'
import { RootStore } from '../../utils/Interface'
import moment from 'moment'
import { likeQna, unlikeQna } from '../../redux/actions/qnaActions'
import { ALERT } from '../../redux/types/alertTypes'

interface IProps {
  item: IQnaData
}

const Qna: React.FC<IProps> = ({ children, item }) => {
  const [isLike, setIsLike] = useState(false)
  const [onReply, setOnReply] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const replyRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleLike = () => {
    if (!auth.token) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please login to like qna'
        }
      })
    }
    
    if (isLike) {
      setIsLike(false)
      dispatch(unlikeQna(item._id!, item.product, auth.token!))
    } else {
      setIsLike(true)
      dispatch(likeQna(item._id!, item.product, auth.token!))
    }
  }
  
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (onReply && replyRef.current && !replyRef.current.contains(e.target as Node)) {
        setOnReply(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [onReply])

  useEffect(() => {
    const findLike = item.likes.find(like => like === auth.user?._id)
    if (findLike) {
      setIsLike(true)
    }

    return () => setIsLike(false)
  }, [item, auth.user?._id])

  return (
    <>
      <div className='flex gap-8 mb-10 flex-col md:flex-row'>
        <div className='flex gap-4'>
          <div className='bg-gray-300 w-10 h-10 rounded-full'>
            <img src={item.user.avatar} alt={item.user.name} className='rounded-full' />
            <div className='hidden md:block h-full w-[1px] bg-gray-400 mt-1 m-auto' />
          </div>
          <p className='text-sm font-oswald tracking-wide'>{item.user.name}</p>
        </div>
        <div className='flex-1'>
          <div>
            <p className='font-opensans text-sm text-justify text-gray-600 leading-6'>{item.content}</p>
            <div className='flex items-center gap-10'>
              <p className='text-gray-400 mt-3 text-sm'>{moment(item.createdAt).fromNow()}</p>
              <div onClick={handleLike} className='flex items-center gap-2 mt-3 text-gray-400 text-sm'>
                <AiFillHeart className={`${isLike ? 'text-red-500' : 'text-gray-400'} cursor-pointer`} />
                {item.likes.length}
              </div>
              {
                auth.token &&
                <div onClick={() => setOnReply(!onReply)} className='text-sm flex items-center gap-2 mt-3 text-gray-400 cursor-pointer'>
                  <MdReplyAll />
                  Reply
                </div>
              }
            </div>
          </div>
          {
            (onReply && auth.token) &&
            <div ref={replyRef} className='mt-5'>
              <QuestionInput id={item.product} reply={item._id} setOnReply={setOnReply} />
            </div>
          }
        </div>
      </div>

      {children}
    </>
  )
}

export default Qna