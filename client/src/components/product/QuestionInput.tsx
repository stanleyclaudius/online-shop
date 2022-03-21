import { useState } from 'react'
import { FormSubmit } from '../../utils/Interface'

const QuestionInput = () => {
  const [question, setQuestion] = useState('')

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className='flex gap-6 items-start flex-col md:flex-row'>
      <div className='flex gap-4'>
        <div className='w-12 h-12 bg-gray-300 rounded-full'>
          
        </div>
        <p className='font-oswald tracking-wide'>Lorem Ipsum</p>
      </div>
      <div className='flex-1'>
        <form onSubmit={handleSubmit}>
          <textarea className='rounded-md p-3 text-sm w-full border border-gray-300 rounded-full resize-none h-24 outline-0' placeholder='Post your question here ...' value={question} onChange={e => setQuestion(e.target.value)} />
          <button className='float-right bg-blue-500 hover:bg-blue-600 text-sm text-white transition-[background] px-3 py-2 rounded-md mt-3 transition-[background]'>Post Question</button>
          <div className='clear-both' />
        </form>
      </div>
    </div>
  )
}

export default QuestionInput