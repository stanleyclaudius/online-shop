import { AiFillStar, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai'
import { IoCopyOutline } from 'react-icons/io5'

const Detail = () => {
  return (
    <div className='flex md:flex-row flex-col-reverse flex-col items-center md:pl-16 pl-8 py-10 md:pr-48 pr-8'>
      <div className='flex-[2] md:mt-0 mt-8'>
        <p className='tracking-widest text-blue-600 text-xs font-bold mb-2'>LIFESTYLE</p>
        <h1 className='mb-5 font-oswald tracking-wide text-xl'>Lebron XII Premium AS iD</h1>
        <div className='flex items-center gap-7 mb-5'>
          <div className='flex'>
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
          </div>
          <p className='text-gray-400 text-sm'>23 Reviews</p>
        </div>
        <div className='flex items-center gap-16'>
          <div>
            <p className='tracking-widest text-blue-600 text-xs font-bold mb-3'>COLORS</p>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 rounded-full bg-blue-600' />
              <div className='w-5 h-5 rounded-full bg-yellow-500' />
              <div className='w-5 h-5 rounded-full bg-red-500' />
            </div>
          </div>
          <div>
            <p className='tracking-widest text-blue-600 text-xs font-bold mb-3'>SIZE</p>
            <div className='flex items-center gap-3'>
              <p className='text-sm text-gray-400'>4.5</p>
              <p className='text-sm text-gray-400'>5</p>
              <p className='text-sm text-gray-400'>5</p>
              <p className='text-sm text-gray-400'>5.5</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-center items-start gap-10 md:mt-5 mt-8'> 
          <div className='flex items-center gap-9'>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>IDR 500K</p>
              <p className='text-gray-400 text-sm line-through'>IDR 750K</p>
            </div>
            <div className='text-xs text-white rounded-md bg-black w-fit p-1 font-bold'>- 15%</div>
          </div>
          <div className='flex items-center gap-5 md:mt-0 -mt-3'>
            <div className='flex gap-2'>
              <div className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0]'>-</div>
              <input type='text' value={2} disabled className='w-[40px] rounded-md bg-gray-100 border border-gray-300 text-center text-sm' />
              <div className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0]'>+</div>
            </div>
            <button className='flex items-center bg-[#3552DC] hover:bg-[#122DB0] rounded-full px-5 py-2 text-white text-sm gap-3 drop-shadow-xl font-bold'>
              <AiOutlineShoppingCart />
              Buy
            </button>
          </div>
        </div>
        <div className='flex items-center gap-8 mt-7'>
          <p className='flex items-center gap-2 text-gray-500 md:text-sm text-xs'>
            <IoCopyOutline />
            COMPARE
          </p>
          <p className='flex items-center gap-2 text-gray-500 md:text-sm text-xs'>
            <AiOutlineHeart />
            ADD TO WISHLIST
          </p>
        </div>
      </div>
      <div className='flex-1 flex flex-col md:flex-row items-center gap-10'>
        <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt='sneakershub' />
        <div className='flex md:flex-col flex-row gap-4'>
          <div className='border border-gray-300 border-2 w-12 h-9 rounded-md p-1'>
            <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="Sneakershub" />
          </div>
          <div className='border border-gray-300 border-2 w-12 h-9 rounded-md p-1'>
            <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="Sneakershub" />
          </div>
          <div className='border border-gray-300 border-2 w-12 h-9 rounded-md p-1'>
            <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="Sneakershub" />
          </div>
          <div className='border border-gray-300 border-2 w-12 h-9 rounded-md p-1'>
            <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="Sneakershub" />
          </div>
          <div className='border border-gray-300 border-2 w-12 h-9 rounded-md p-1'>
            <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="Sneakershub" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail