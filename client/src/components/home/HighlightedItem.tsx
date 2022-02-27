import { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HighlightedItem = () => {
  const [currSlide, setCurrSlide] = useState(1)

  const handleArrow = (type: string) => {
    if (type === 'prev') {
      if (currSlide === 1) setCurrSlide(2)
      else setCurrSlide(currSlide - 1)
    } else if (type === 'next') {
      if (currSlide === 2) setCurrSlide(1)
      else setCurrSlide(currSlide + 1)
    }
  }
  
  return (
    <div className='relative flex flex-col md:flex-row'>
      <FaChevronCircleLeft className='md:hidden absolute top-[50%] text-white left-4 cursor-pointer text-xl' onClick={() => handleArrow('prev')} />
      <div className={`md:flex ${currSlide === 1 ? 'flex' : 'hidden'} flex-1 items-center justify-between bg-gradient-to-l from-[#6CB9EF] to-[#2B88D6] px-12 py-7 md:flex-row flex-col flex-col-reverse gap-4`}>
        <div className='flex-1 text-white'>
          <Link to='/' className='bg-[#09274C] py-2 px-3 text-xs'>Detail</Link>
          <p className='text-sm mt-6 md:mt-8 mb-2'>Dior x Nike Jordan</p>
          <h2 className='text-2xl font-oswald'>Air Jordan</h2>
          <button className='md:mt-8 mt-5 rounded-full drop-shadow-2xl bg-blue-400 text-sm w-36 h-10 flex items-center justify-center gap-3'>
            <AiOutlineShoppingCart />
            Add To Cart
          </button>
        </div>
        <div className='w-fit'>
          <img src={`${process.env.PUBLIC_URL}/images/shoes.png`} alt='Air Jordan' className='w-[300px]' />
        </div>
      </div>
      <FaChevronCircleRight className='md:hidden absolute top-[50%] right-4 text-white cursor-pointer text-xl' onClick={() => handleArrow('next')} />
      <div className={`md:flex ${currSlide === 2 ? 'flex' : 'hidden'} flex-1 items-center justify-between bg-gradient-to-l from-[#8A79EC] to-[#4D44DB] px-12 py-7 md:flex-row flex-col flex-col-reverse gap-4`}>
        <div className='flex-1 text-white'>
          <Link to='/' className='bg-[#09274C] py-2 px-3 text-xs'>Detail</Link>
          <p className='text-sm mt-6 md:mt-8 mb-2'>Dior x Nike Jordan</p>
          <h2 className='text-2xl font-oswald'>Air Jordan</h2>
          <button className='md:mt-8 mt-5 rounded-full drop-shadow-2xl bg-[#7465E2] text-sm w-36 h-10 flex items-center justify-center gap-3'>
            <AiOutlineShoppingCart />
            Add To Cart
          </button>
        </div>
        <div className='w-fit'>
          <img src={`${process.env.PUBLIC_URL}/images/shoes.png`} alt='Air Jordan' className='w-[300px]' />
        </div>
      </div>
    </div>
  )
}

export default HighlightedItem