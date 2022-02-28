import React from 'react'
import { useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { InputChange } from './../../utils/Interface'

interface IProps {
  filterRef: React.MutableRefObject<HTMLDivElement>
  openFilter: boolean
}

const Filter: React.FC<IProps> = ({ filterRef, openFilter }) => {
  const [price, setPrice] = useState({ min: 2500, max: 7500 })

  const handleChangeSlider = (e: InputChange) => {
    const { value, name } = e.target
    setPrice({ ...price, [name]: value })
  }

  return (
    <div ref={filterRef} className={`absolute top-0 ${openFilter ? 'left-0' : '-left-[500px]'} w-[250px] drop-shadow-2xl bg-white lg:static lg:drop-shadow-none bottom-0 z-[999] flex-1 font-opensans border-l border-r border-b border-gray-300`}>
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
          <p className='text-xs font-bold tracking-widest ml-3'>PRICE (IDR)</p>
        </div>
        <div className='flex gap-4 pl-11 pr-3 w-full mt-2'>
          <input type='number' value={price.min} disabled className='text-center w-[50%] h-9 border border-gray-300 bg-gray-100 rounded-md'/>
          <input type='number' value={price.max} disabled className='text-center w-[50%] border border-gray-300 bg-gray-100 rounded-md' />
        </div>
        <div className='my-4 ml-11 mr-3 h-[5px] relative bg-[#DDD] rounded-[5px]'>
          <div className='h-full left-[25%] right-[25%] absolute rounded-[5px] bg-[#17A2B8] progress' />
        </div>
        <div className='relative ml-11 mr-3'>
          <input type='range' min={0} max={10000} name='min' value={price.min} step={1} onChange={handleChangeSlider} className='range-input range-min' />
          <input type='range' min={0} max={10000} name='max' value={price.max} step={1} onChange={handleChangeSlider} className='range-input range-max' />
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