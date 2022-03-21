import { useSelector } from 'react-redux'
import { RootStore } from './../../utils/Interface'
import QnaDisplay from './QnaDisplay'
import QuestionInput from './QuestionInput'

interface IProps {
  id: string
}

const QnaContainer: React.FC<IProps> = ({ id }) => {
  const { qna } = useSelector((state: RootStore) => state)

  return (
    <div className='bg-gray-100 md:px-16 px-8 py-10'>
      <div className='flex gap-5 font-oswald border-b border-gray-300 pb-5 font-oswald'>
        <h1 className='trackin-wide'>All QnA</h1>
        <p className='text-blue-600'>20 Qna</p>
      </div>
      <div className='mt-6'>
        <QuestionInput id={id} />
        <div className='border-b border-gray-300 pb-5' />
        <div className='mt-5'>
          <QnaDisplay />
          <QnaDisplay />
          <QnaDisplay />
        </div>
      </div>
    </div>
  )
}

export default QnaContainer