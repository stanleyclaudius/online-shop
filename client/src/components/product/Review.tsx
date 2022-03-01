import { AiFillHeart, AiFillStar } from "react-icons/ai"

const Review = () => {
  return (
    <div className='flex md:flex-row flex-col gap-8 border-b border-gray-300 py-7'>
      <div className='flex gap-5'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
        <div>
          <p className='font-bold font-opensans text-xs mb-1'>Lorem Ipsum</p>
          <div className='flex items-center'>
            <AiFillStar className='text-orange-400' />
            <AiFillStar className='text-orange-400' />
            <AiFillStar className='text-orange-400' />
            <AiFillStar className='text-orange-400' />
            <AiFillStar className='text-gray-300' />
          </div>
        </div>
      </div>
      <div>
        <p className='font-opensans text-sm text-justify text-gray-600 leading-6'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa repellendus sunt maiores eos sequi nostrum molestiae dolores quia assumenda molestias harum quis quibusdam qui, minus iusto nesciunt placeat eaque mollitia.
        </p>
        <div className='flex items-center gap-2 mt-3 text-gray-400 text-sm'>
          <AiFillHeart />
          5
        </div>
      </div>
    </div>
  )
}

export default Review