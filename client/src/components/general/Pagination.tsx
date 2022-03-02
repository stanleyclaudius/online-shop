import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const Pagination = () => {
  return (
    <div className='flex items-center justify-between border-r border-b border-gray-300'>
      <div className='p-3 cursor-pointer'>
        <BiChevronLeft className='text-2xl text-gray-500' />
      </div>
      <div className='flex items-center gap-2 border-l flex-1 border-r border-gray-300 justify-center'>
        <div className='py-3 px-4 cursor-pointer hover:bg-[#3552DC] hover:text-white'>1</div>
        <div className='py-3 px-4 cursor-pointer hover:bg-[#3552DC] hover:text-white'>2</div>
        <div className='py-3 px-4 cursor-pointer hover:bg-[#3552DC] hover:text-white'>3</div>
        <div className='py-3 px-4 cursor-pointer hover:bg-[#3552DC] hover:text-white'>4</div>
        <div className='py-3 px-4 cursor-pointer hover:bg-[#3552DC] hover:text-white'>5</div>
      </div>
      <div className='p-3 cursor-pointer'>
        <BiChevronRight className='text-2xl text-gray-500' />
      </div>
    </div>
  )
}

export default Pagination