import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between pl-10 py-4'>
      <div className='font-opensans text-xl font-medium'>
        sneakershub
      </div>
      <div className='flex items-center gap-7'>
        <AiOutlineSearch className='cursor-pointer' />
        <AiOutlineHeart className='cursor-pointer' />
        <AiOutlineShoppingCart className='cursor-pointer' />
        <Link to='/login' className='bg-[#2D1E1C] text-white py-2 px-5 text-xs'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar