import { AiFillBell } from 'react-icons/ai'
import { BsPower } from 'react-icons/bs'

const Navbar = () => {
  return (
    <div className='flex items-center justify-end gap-8 text-lg'>
      <div className='text-sm flex items-center gap-4'>
        <div className='w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center'></div>
        <p>admin@gmail.com</p>
      </div>
      <AiFillBell className='cursor-pointer' />
      <BsPower className='cursor-pointer' />
    </div>
  )
}

export default Navbar