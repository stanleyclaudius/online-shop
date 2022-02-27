import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-[#3853D8] text-white px-7 py-4 shadow-xl'>
      <div>
        <AiOutlineSearch className='text-lg cursor-pointer' />
      </div>
      <div className='font-bold font-opensans'>
        sneakershub
      </div>
      <div className='flex items-center gap-3 md:gap-6'>
        <AiOutlineUser className='text-lg cursor-pointer' />
        <AiOutlineHeart className='text-lg cursor-pointer' />
        <AiOutlineShoppingCart className='text-lg cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar