import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQna } from '../../redux/actions/qnaActions'
import { IQnaData } from '../../redux/types/qnaTypes'
import { RootStore } from './../../utils/Interface'
import QnaDisplay from './QnaDisplay'
import QuestionInput from './QuestionInput'

interface IProps {
  id: string
}

const QnaContainer: React.FC<IProps> = ({ id }) => {
  const [qnas, setQnas] = useState<IQnaData[]>([])
  const [filteredQna, setFilteredQna] = useState<IQnaData[]>([])
  const [next, setNext] = useState(2)

  const dispatch = useDispatch()
  const { auth, qna } = useSelector((state: RootStore) => state)

  useEffect(() => {
    dispatch(getQna(id))
  }, [dispatch, id])

  useEffect(() => {
    const commentWithoutReply = qna.data.filter(item => !item.reply)
    setFilteredQna(commentWithoutReply)
    setQnas(commentWithoutReply.slice(commentWithoutReply.length - next))
  }, [qna, next])

  return (
    <div className='bg-gray-100 md:px-16 px-8 py-10'>
      <div className='flex gap-5 font-oswald border-b border-gray-300 pb-5 font-oswald'>
        <h1 className='trackin-wide'>All QnA</h1>
        <p className='text-blue-600'>{qna.data.length}</p>
      </div>
      <div className='mt-6'>
        {
          auth.token &&
          <>
            <QuestionInput id={id} />
            <div className='border-b border-gray-300 pb-5' />
          </>
        }
        <div className='mt-5'>
          {
            qnas.map(item => (
              <QnaDisplay key={item._id} item={item} />
            ))
          }

          {
            filteredQna.length - next > 0
            ? (
              <div onClick={() => setNext(filteredQna.length)} className='cursor-pointer text-blue-600 underline text-sm w-fit'>See more</div>
            )
            : filteredQna.length > 2 && (
              <div onClick={() => setNext(2)} className='cursor-pointer text-sm text-blue-600 underline w-fit'>Hide</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default QnaContainer