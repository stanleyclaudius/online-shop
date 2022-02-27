const ProductCard = () => {
  return (
    <div className='border-b border-r border-gray-300 px-7 pt-14 pb-4 relative cursor-pointer'>
      <div className='absolute top-4 right-4 font-opensans text-xs bg-black w-fit text-white rounded-md p-2 font-bold'>- 15%</div>
      <div className='w-fit object-contain'>
        <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="" />
      </div>
      <h1 className='font-oswald mt-6 mb-2 text-xl'>Nike Air Jordan</h1>
      <p className='font-opensans text-sm'>IDR 500K</p>
    </div>
  )
}

export default ProductCard