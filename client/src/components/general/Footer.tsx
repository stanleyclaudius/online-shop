import { HiMail } from 'react-icons/hi'
import { MdLocationOn } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex md:flex-row flex-col gap-10 px-5 justify-evenly bg-gray-800 text-white py-8'>
      <div>
        <h1 className='font-opensans font-bold tracking-widest mb-2 text-xl'>SNEAKERSKU</h1>
        <p className='text-gray-200'>Find your choiced shoes to be your everyday lifestyle</p>
        <div className='my-5 flex items-center gap-5 text-gray-200 text-sm'>
          <p className='cursor-pointer hover:underline'>Guides</p>
          <p className='cursor-pointer hover:underline'>Terms of Use</p>
          <p className='cursor-pointer hover:underline'>Privacy Policy</p>
        </div>
        <p className='text-sm text-gray-500'>Copyright<sup>&copy;</sup> 2022. All rights reserved</p>
      </div>
      <div>
        <h1 className='font-oswald font-bold mb-4'>ABOUT US</h1>
        <div className='flex items-center mb-2 gap-3'>
          <MdLocationOn />
          <p>Example St. 20231. West Jakarta</p>
        </div>
        <div className='flex items-center mb-2 gap-3'>
          <FaPhoneAlt className='text-xs translate-x-[2px]' />
          <p className='translate-x-1'>021 - 1234 567</p>
        </div>
        <div className='flex items-center gap-3'>
          <HiMail />
          <p>sneakersku@example.com</p>
        </div>
      </div>
      <div>
        <h1 className='font-oswald font-bold mb-4'>GET HELP</h1>
        <div>
          <p className='cursor-pointer hover:underline'>Order Process</p>
        </div>
      </div>
    </div>
  )
}

export default Footer