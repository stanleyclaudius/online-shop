import { HiOutlineRefresh } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'

const Filter = () => {
  return (
    <div className='flex-1 font-opensans border-l border-r border-b border-gray-300'>
      <div className='flex items-center justify-between border-b border-gray-300'>
        <p className='font-bold border-r border-gray-300 flex-1 px-4 py-3 text-sm'>Filter</p>
        <div className='py-2 px-3'>
          <HiOutlineRefresh className='text-xl cursor-pointer text-blue-600' />
        </div>
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>CATEGORIES</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'>
          <p className='text-sm'>Category 1</p>
          <p className='text-sm text-gray-500'>25</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'>
          <p className='text-sm'>Category 1</p>
          <p className='text-sm text-gray-500'>25</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'>
          <p className='text-sm'>Category 1</p>
          <p className='text-sm text-gray-500'>25</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'>
          <p className='text-sm'>Category 1</p>
          <p className='text-sm text-gray-500'>25</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'>
          <p className='text-sm'>Category 1</p>
          <p className='text-sm text-gray-500'>25</p>
        </div>
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>PRICE</p>
        </div>
        <div className='flex gap-4 pl-11 pr-3 w-full mt-2'>
          <input type='number' disabled className='w-[50%] h-9 border border-gray-300 bg-gray-200 rounded-md'/>
          <input type='number' disabled className='w-[50%] border border-gray-300 bg-gray-200 rounded-md' />
        </div>
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>BRANDS</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 my-2'>
          <p>Nike</p>
          <input type='checkbox' />
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 my-2'>
          <p>Adidas</p>
          <input type='checkbox' />
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 my-2'>
          <p>Skechers</p>
          <input type='checkbox' />
        </div>
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>COLORS</p>
        </div>
        <div className='grid grid-cols-7 pl-11 pr-3 gap-2 mt-2 mb-4'>
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
          <div className='w-6 h-6 bg-gray-300 rounded-full' />
        </div>
      </div>
      <div>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>SIZE</p>
        </div>
        <div className='grid grid-cols-5 pl-11 pr-3 mt-2 mb-4'>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer'>1</div>
        </div>
      </div>
    </div>
  )
}

export default Filter