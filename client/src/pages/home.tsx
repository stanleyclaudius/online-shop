import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import HamburgerMenu from './../components/general/HamburgerMenu'
import Navbar from './../components/general/Navbar'

const Home = () => {
  return (
    <div className='bg-[#F4F5FA] flex'>
      <div>
        <div className='cursor-pointer bg-[#2D1E1C] p-6'>
          <HamburgerMenu />
        </div>
      </div>
      <div className='flex-1 pr-10'>
        <Navbar />
        <div className='w-full bg-white justify-between flex items-center px-20'>
          <div>
            <h1 className='text-5xl mb-7'>Dior X Nike Air Jordan</h1>
            <p>
              Air Jordan shoes by Nike that collaborate with <br /> Dior give smooth step sensing
            </p>
            <div className='mt-5 flex items-center gap-20'>
              <div>
                <p className='text-gray-400'>Price</p>
                <p className='mt-2'>$117.19</p>
              </div>
              <div>
                <p className='text-gray-400'>Color</p>
                <div className='flex items-center mt-2 gap-3'>
                  <div className='w-5 h-5 bg-gray-400 rounded-full' />
                  <div className='w-5 h-5 bg-orange-400 rounded-full' />
                  <div className='w-5 h-5 bg-blue-400 rounded-full' />
                </div>
              </div>
              <div>
                <p className='text-gray-400'>Size</p>
                <p className='mt-2'>42</p>
              </div>
            </div>
            <div className='flex items-center gap-7 mt-10'>
              <button className='bg-[#F4F5FA] border-[1px] border-black w-28 h-10 text-sm'>Shop Now</button>
              <AiOutlineHeart className='text-xl' />
              <AiOutlineShoppingCart className='text-xl' />
            </div>
          </div>
          <img src={`${process.env.PUBLIC_URL}/images/shoes.png`} alt='Nike Dior' className='w-[600px]' />
        </div>
      </div>
    </div>
  )
}

export default Home