import { Link, useParams } from 'react-router-dom'
import { BsFillGrid1X2Fill, BsFilter } from 'react-icons/bs'
import { FaBoxes, FaPercentage, FaUser } from 'react-icons/fa'
import { MdOutlineAccountTree } from 'react-icons/md'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { SiNike } from 'react-icons/si'

const Sidebar = () => {
  const { page } = useParams()

  return (
    <div className='border-r border-gray-300 px-7 py-5 flex items-center flex-col'>
      <BsFilter className='text-2xl mb-10' />
      <div className='flex flex-col gap-5 text-xl text-gray-400 items-center'>
        <Link
          to='/dashboard'
          className={`${page === 'dashboard' ? 'bg-[#F0D9F5]' : undefined} p-3 hover:bg-[#F0D9F5] rounded-md cursor-pointer`}
        >
          <BsFillGrid1X2Fill className={`text-sm ${page === 'dashboard' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
        <Link
          to='/product'
          className={`cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md ${page === 'product' ? 'bg-[#F0D9F5]' : undefined}`}
        >
          <FaBoxes className={`${page === 'product' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
        <Link
          to='/user'
          className={`cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md ${page === 'user' ? 'bg-[#F0D9F5]' : undefined}`}
        >
          <FaUser className={`${page === 'user' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
        <Link
          to='/transaction'
          className={`cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md ${page === 'transaction' ? 'bg-[#F0D9F5]' : undefined}`}
        >
          <RiSecurePaymentFill className={`${page === 'transaction' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
        <Link
          to='/category'
          className={`cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md ${page === 'category' ? 'bg-[#F0D9F5]' : undefined}`}
        >
          <MdOutlineAccountTree className={`${page === 'category' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
        <Link
          to='/discount'
          className={`cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md ${page === 'discount' ? 'bg-[#F0D9F5]' : undefined}`}
        >
          <FaPercentage className={`${page === 'discount' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
        <Link
          to='/brand'
          className={`cursor-pointer p-3 hover:bg-[#F0D9F5] rounded-md ${page === 'brand' ? 'bg-[#F0D9F5]' : undefined}`}
        >
          <SiNike className={`${page === 'brand' ? 'text-[#B246D5]' : undefined}`} />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar