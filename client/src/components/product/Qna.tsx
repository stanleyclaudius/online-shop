import { useState, useEffect, useRef } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { MdReplyAll } from 'react-icons/md'
import { IQnaData } from '../../redux/types/qnaTypes'
import QuestionInput from './QuestionInput'

interface IProps {
  item: IQnaData
}

const Qna: React.FC<IProps> = ({ children, item }) => {
  const [onReply, setOnReply] = useState(false)

  const replyRef = useRef() as React.MutableRefObject<HTMLDivElement>
  
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (onReply && replyRef.current && !replyRef.current.contains(e.target as Node)) {
        setOnReply(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [onReply])

  return (
    <>
      <div className='flex gap-8 mb-10 flex-col md:flex-row'>
        <div className='flex gap-4'>
          <div className='bg-gray-300 w-10 h-10 rounded-full'>
            <img src={item.user.avatar} alt={item.user.name} className='rounded-full' />
          </div>
          <p className='text-sm font-oswald tracking-wide'>{item.user.name}</p>
        </div>
        <div className='flex-1'>
          <div>
            <p className='font-opensans text-sm text-justify text-gray-600 leading-6'>{item.content}</p>
            <div className='flex items-center gap-10'>
              <div className='flex items-center gap-2 mt-3 text-gray-400 text-sm'>
                <AiFillHeart className={`text-gray-400 cursor-pointer`} />
                {item.likes.length}
              </div>
              <div onClick={() => setOnReply(!onReply)} className='text-sm flex items-center gap-2 mt-3 text-gray-400 cursor-pointer'>
                <MdReplyAll />
                Reply
              </div>
            </div>
          </div>
          {
            onReply &&
            <div ref={replyRef} className='mt-5'>
              <QuestionInput id={item.product} reply={item._id} />
            </div>
          }
        </div>
      </div>

      {children}
    </>
  )
}

export default Qna