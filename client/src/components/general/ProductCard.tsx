import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai'
import { IoCopyOutline } from 'react-icons/io5'

const ProductCard = () => {
  return (
    <div className='product-card border-b border-r border-gray-300 px-7 pt-14 pb-4 relative relative'>
      <div className='absolute top-4 right-4 font-opensans text-xs bg-black w-fit text-white rounded-md p-2 font-bold'>- 15%</div>
      <div className='w-fit object-contain'>
        <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="" />
      </div>
      <h1 className='font-oswald mt-6 mb-2 text-xl'>Nike Air Jordan</h1>
      <p className='font-opensans text-sm'>IDR 500K</p>
      <div className='product-detail opacity-0 drop-shadow-2xl absolute top-0 right-0 bg-[#415DDA] w-full h-full px-5 py-7 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-white font-bold'>LIFESTYLE</p>
          <div className='font-opensans text-xs bg-black w-fit text-white rounded-md p-2 font-bold'>- 15%</div>
        </div>
        <div className='flex items-center gap-7'>
          <button className='flex items-center gap-2 bg-white rounded-full px-7 font-medium py-3 text-[#415FFA] text-sm'>
            <AiOutlineShoppingCart />
            Buy
          </button>
          <div className='flex items-center gap-3'>
            <button className='rounded-full text-white bg-[#667AD3] w-9 h-9 flex items-center justify-center'><IoCopyOutline /></button>
            <button className='rounded-full text-white bg-[#667AD3] w-9 h-9 flex items-center justify-center'><AiOutlineHeart /></button>
          </div>
        </div>
        <div className='text-white'>
          <p className='font-oswald text-lg mb-2'>Nike Air Jordan</p>
          <p className='text-sm font-bold'>IDR 500K</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard