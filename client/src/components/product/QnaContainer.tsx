import QnaDisplay from './QnaDisplay'
import QuestionInput from './QuestionInput'

const QnaContainer = () => {
  return (
    <div className='bg-gray-100 md:px-16 px-8 py-10'>
      <div className='flex gap-5 font-oswald border-b border-gray-300 pb-5 font-oswald'>
        <h1 className='trackin-wide'>All QnA</h1>
        <p className='text-blue-600'>20 Qna</p>
      </div>
      <div className='mt-6'>
        <QuestionInput />
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