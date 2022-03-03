import { BsFillGrid1X2Fill, BsFilter } from 'react-icons/bs'
import { FaBoxes, FaUser } from 'react-icons/fa'
import { MdOutlineAccountTree } from 'react-icons/md'
import { RiSecurePaymentFill } from 'react-icons/ri'

const Sidebar = () => {
  return (
    <div className='border-r border-gray-300 px-7 py-5 flex items-center flex-col'>
      <BsFilter className='text-2xl mb-10' />
      <div className='flex flex-col gap-5 text-xl text-gray-400 items-center'>
        <div className='bg-[#F0D9F5] p-3 rounded-md cursor-pointer'>
          <BsFillGrid1X2Fill className='text-sm text-[#B246D5]' />
        </div>
        <div className='cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md'>
          <FaBoxes />
        </div>
        <div className='cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md'>
          <FaUser />
        </div>
        <div className='cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md'>
          <RiSecurePaymentFill />
        </div>
        <div className='cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md'>
          <MdOutlineAccountTree />
        </div>
      </div>
    </div>
  )
}

export default Sidebar