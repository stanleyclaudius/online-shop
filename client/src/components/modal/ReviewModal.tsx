import { useState } from 'react'
import { AiFillStar, AiOutlineClose } from 'react-icons/ai'
import { FormSubmit } from './../../utils/Interface'

const ReviewModal= () => {
  const [star, setStar] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className={`transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5`}>
      <div className={`transition-transform w-full max-w-[500px] bg-white rounded-md`}>
        <div className='flex items-center justify-between border-b border-gray-300 p-5 font-opensans'>
          <h1>Review Product</h1>
          <AiOutlineClose />
        </div>
        <div className='p-5 font-opensans'>
          <div className='mb-4'>
            <p>Rating</p>
            <div className='flex items-center mt-2 gap-2'>
              {
                Array.from(Array(star).keys()).map((_, idx) => (
                  <AiFillStar className='text-2xl text-orange-400' onMouseOver={() => setStar(idx + 1)}  />
                ))
              }
              {
                Array.from(Array(5 - star).keys()).map((_, idx) => (
                  <AiFillStar className='text-2xl text-gray-300' onMouseOver={() => setStar(idx + star + 1)} />
                ))
              }
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='comment'>Comment</label>
              <textarea
                id='comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
                className='outline-0 border border-gray-300 rounded-md w-full p-2 text-sm resize-none mt-2 h-[100px]'
              />
            </div>
            <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] text-white text-sm rounded-full px-5 py-2 mt-4 float-right'>Rate Product</button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal