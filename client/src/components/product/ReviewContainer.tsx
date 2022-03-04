import { AiFillStar } from 'react-icons/ai'
import Review from './Review'

const ReviewContainer = () => {
  return (
    <div className='bg-gray-100 md:px-16 px-8 md:flex-row flex-col-reverse flex flex-col py-10 gap-10'>
      <div className='flex-[3]'>
        <div className='flex gap-5 font-oswald border-b border-gray-300 pb-5'>
          <p className='tracking-wide'>All Reviews</p>
          <p className='text-blue-600'>23</p>
        </div>
        <div>
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
        <div className='flex items-center justify-end mt-6 gap-7 text-sm font-bold'>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='border-b border-gray-300 pb-5'>
          <p className='font-oswald tracking-wide'>Reviews Overall</p>
        </div>
        <div className='mb-6'>
          <div className='flex items-center justify-between mt-6 mb-3'>
            <div className='flex gap-1'>
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
            </div>
            <p className='text-xs text-gray-400 font-bold'>10 Reviews</p>
          </div>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex gap-1'>
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-gray-300' />
            </div>
            <p className='text-xs text-gray-400 font-bold'>5 Reviews</p>
          </div>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex gap-1'>
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-gray-300' />
              <AiFillStar className='text-gray-300' />
            </div>
            <p className='text-xs text-gray-400 font-bold'>7 Reviews</p>
          </div>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex gap-1'>
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-gray-300' />
              <AiFillStar className='text-gray-300' />
              <AiFillStar className='text-gray-300' />
            </div>
            <p className='text-xs text-gray-400 font-bold'>0 Review</p>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-1'>
              <AiFillStar className='text-orange-400' />
              <AiFillStar className='text-gray-300' />
              <AiFillStar className='text-gray-300' />
              <AiFillStar className='text-gray-300' />
              <AiFillStar className='text-gray-300' />
            </div>
            <p className='text-xs text-gray-400 font-bold'>0 Review</p>
          </div>
        </div>
        <button className='bg-[#3552DC] rounded-full text-white text-sm w-full h-9 drop-shadow-xl hover:bg-[#122DB0] transition-[background]'>Add Review</button>
      </div>
    </div>
  )
}

export default ReviewContainer