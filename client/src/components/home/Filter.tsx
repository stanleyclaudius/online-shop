import { useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface IProps {
  filterRef: React.MutableRefObject<HTMLDivElement>
  openFilter: boolean
}

const { createSliderWithTooltip }: any = Slider
// @ts-ignore
const Range = createSliderWithTooltip(Slider.Range)

const Filter: React.FC<IProps> = ({ filterRef, openFilter }) => {
  const [price, setPrice] = useState([1, 1000])

  return (
    <div
      ref={filterRef}
      className={`absolute top-0 ${openFilter ? 'left-0' : '-left-[500px]'} w-[250px] drop-shadow-2xl bg-white lg:static lg:drop-shadow-none bottom-0 z-[999] flex-1 font-opensans border-l border-r border-b border-gray-300`}
    >
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
          <input
            type='number'
            disabled
            value={price[0]}
            className='text-center w-[50%] h-9 border border-gray-300 bg-gray-100 rounded-md'
          />
          <input
            type='number'
            disabled
            value={price[1]}
            className='text-center w-[50%] border border-gray-300 bg-gray-100 rounded-md'
          />
        </div>
        <div className='ml-11 mr-3 my-4'>
          <Range
            min={1}
            max={1000}
            defaultValue={[1, 1000]}
            tipFormatter={(value: number) => `$${value}`}
            tipProps={{
              placement: 'top'
            }}
            value={price}
            onChange={(price: number[]) => setPrice(price)}
          />
        </div>
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>BRANDS</p>
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 my-2'>
          <label htmlFor='nike'>Nike</label>
          <input type='checkbox' id='nike' />
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 my-2'>
          <label htmlFor='adidas'>Adidas</label>
          <input type='checkbox' id='adidas' />
        </div>
        <div className='flex items-center justify-between pl-11 pr-3 my-2'>
          <label htmlFor='skechers'>Skechers</label>
          <input type='checkbox' id='skechers' />
        </div>
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>COLORS</p>
        </div>
        <div className='grid grid-cols-7 pl-11 pr-3 gap-2 mt-2 mb-4'>
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
          <div className='w-6 h-6 bg-gray-300 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' />
        </div>
      </div>
      <div>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>SIZE</p>
        </div>
        <div className='grid grid-cols-5 pl-11 pr-3 mt-2 mb-4'>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
          <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>1</div>
        </div>
      </div>
    </div>
  )
}

export default Filter