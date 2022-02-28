import { HiMail } from 'react-icons/hi'

const Subscribe = () => {
  return (
    <div className='bg-gray-200 px-10 pt-28 pb-12 text-center -mt-[90px]'>
      <h1 className='font-oswald text-xl tracking-wider font-bold'>SUBSCRIBE TO OUR NEWSLETTER</h1>
      <p className='text-gray-500 text-sm my-7 w-full max-w-[450px] m-auto'>Subscribe to our newsletter to get the latest news from <strong>sneakershub</strong> about store discount and event.</p>
      <form className='flex items-center justify-between drop-shadow-2xl bg-white w-full max-w-[400px] rounded-full m-auto pl-2 pr-4 py-2'>
        <input type='text' className='bg-transparent px-3 outline-0 font-opensans w-full' />
        <HiMail className='text-blue-700 text-xl' />
      </form>
    </div>
  )
}

export default Subscribe