import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { IBrandData } from './../../redux/types/brandTypes'
import { IHomeProductData } from './../../redux/types/homeProductTypes'
import { RootStore } from './../../utils/Interface'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { numberFormatter } from '../../utils/numberFormatter'

interface IProps {
  filterRef: React.MutableRefObject<HTMLDivElement>
  openFilter: boolean
  categories: IHomeProductData[]
  brands: IBrandData[]
}

const { createSliderWithTooltip }: any = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Filter: React.FC<IProps> = ({ filterRef, openFilter, brands, categories }) => {
  const [price, setPrice] = useState([1, 1000])
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<number[]>([])

  const { homeProduct } = useSelector((state: RootStore) => state)

  const getSizeAndBrand = useCallback(() => {
    const sizesTemp: number[] = []
    const colorsTemp: string[] = []

    homeProduct.data.forEach(item => {
      item.products.forEach(prod => {
        prod.sizes.forEach(sz => {
          if (!sizesTemp.includes(sz)) {
            sizesTemp.push(sz)
          }
        })

        prod.colors.forEach(clr => {
          if (!colorsTemp.includes(clr))
          colorsTemp.push(clr)
        })
      })
    })

    setSizes(sizesTemp)
    setColors(colorsTemp)
  }, [homeProduct.data])

  useEffect(() => {
    setPrice([homeProduct.minPrice, homeProduct.maxPrice])
  }, [homeProduct.maxPrice, homeProduct.minPrice])

  useEffect(() => {
    getSizeAndBrand()
  }, [getSizeAndBrand])

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
        {
          categories.map(item => (
            <div key={item._id} className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'>
              <p className='text-sm'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.count}</p>
            </div>
          ))
        }
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>PRICE (IDR)</p>
        </div>
        <div className='flex gap-4 pl-11 pr-3 w-full mt-2'>
          <input
            type='text'
            disabled
            value={numberFormatter(price[0])}
            className='text-center text-sm w-[50%] h-9 border border-gray-300 bg-gray-100 rounded-md'
          />
          <input
            type='text'
            disabled
            value={numberFormatter(price[1])}
            className='text-center text-sm w-[50%] border border-gray-300 bg-gray-100 rounded-md'
          />
        </div>
        <div className='ml-11 mr-3 my-4'>
          <Range
            min={homeProduct.minPrice}
            max={homeProduct.maxPrice}
            defaultValue={[homeProduct.minPrice, homeProduct.maxPrice]}
            tipFormatter={(value: number) => numberFormatter(value)}
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
        {
          brands.map(item => (
            <div key={item._id} className='flex items-center justify-between pl-11 pr-3 my-2'>
              <label htmlFor={item.name}>{item.name}</label>
              <input type='checkbox' id={item.name} />
            </div>
          ))
        }
      </div>
      <div className='border-b border-gray-300'>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>COLORS</p>
        </div>
        <div className='grid grid-cols-7 pl-11 pr-3 gap-2 mt-2 mb-4'>
          {
            colors.map(item => (
              <div className='w-6 h-6 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' style={{ background: item }} />
            ))
          }
        </div>
      </div>
      <div>
        <div className='flex items-center px-4 pt-4 pb-2'>
          <BiChevronDown />
          <p className='text-xs font-bold tracking-widest ml-3'>SIZE</p>
        </div>
        <div className='grid grid-cols-5 pl-11 pr-3 mt-2 mb-4'>
          {
            sizes.sort().map(item => (
              <div className='border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all'>{item}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Filter