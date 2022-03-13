import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { BiChevronDown } from 'react-icons/bi'
import { BsFilter } from 'react-icons/bs'
import { IoCopyOutline, IoGrid } from 'react-icons/io5'
import { OPEN_COMPARE_MODAL } from './../../redux/types/compareTypes'

interface IProps {
  openFilter: boolean
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortType: React.Dispatch<React.SetStateAction<string>>
}

const ProductViewOption: React.FC<IProps> = ({ openFilter, setOpenFilter, setSortBy, setSortType }) => {
  const [openSortDropdown, setOpenSortDropdown] = useState(false)
  const [currentSortBy, setCurrentSortBy] = useState('date')
  const [currentSortType, setCurrentSortType] = useState('desc')

  const dispatch = useDispatch()
  const sortRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickSort = (by: string, type: string) => {
    setCurrentSortBy(by)
    setCurrentSortType(type)
    setSortBy(by)
    setSortType(type)
    setOpenSortDropdown(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSortDropdown && sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setOpenSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSortDropdown])

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 font-opensans'>
        <div className='lg:hidden flex items-center justify-between px-5 py-3 border-r border-b border-gray-300'>
          <p className='font-medium text-sm'>Filter</p>
          <BsFilter
            onClick={() => setOpenFilter(!openFilter)}
            className='text-blue-600 text-lg cursor-pointer'
          />
        </div>
        <div className='relative'>
          <div className='flex items-center justify-between px-5 py-3 border-r border-b border-gray-300'>
            <div className='flex gap-3 text-sm font-medium'>
              <p>Sort By :</p>
              <p className='capitalize'>
                {currentSortBy}
                {
                  currentSortType === 'asc'
                  ? currentSortBy === 'price' ? ' $ - $$' : ' 1 - 31'
                  : currentSortBy === 'price' ? ' $$ - $' : ' 31 - 1'
                }
              </p>
            </div>
            <BiChevronDown onClick={() => setOpenSortDropdown(true)} className='cursor-pointer' />
          </div>
          <div ref={sortRef} className={`${openSortDropdown ? 'scale-y-100' : 'scale-y-0'} transition-[transform] origin-top absolute top-100 w-full border border-gray-300 bg-white z-[999] shadow-lg text-sm`}>
            <div
              onClick={() => handleClickSort('date', 'asc')}
              className='px-5 py-3 cursor-pointer hover:bg-gray-100 transition-[background]'
            >
              <p>Date 1 - 31</p>
            </div>
            <div
              onClick={() => handleClickSort('date', 'desc')}
              className='px-5 py-3 cursor-pointer hover:bg-gray-100 transition-[background]'
            >
              <p>Date 31 - 1</p>
            </div>
            <div
              onClick={() => handleClickSort('price', 'asc')}
              className='px-5 py-3 cursor-pointer hover:bg-gray-100 transition-[background]'
            >
              <p>Price $ - $$</p>
            </div>
            <div
              onClick={() => handleClickSort('price', 'desc')}
              className='px-5 py-3 cursor-pointer hover:bg-gray-100 transition-[background]'
            >
              <p>Price $$ - $</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between px-5 py-3 border-r border-b border-gray-300'>
          <div className='flex gap-3 text-sm font-medium items-center'>
            <p>View :</p>
            <p className='flex items-center gap-2'>
              <IoGrid className='text-blue-600' />
              Grid
            </p>
          </div>
          <BiChevronDown className='cursor-pointer' />
        </div>
        <div className='flex items-center justify-between px-5 py-3 border-r border-b border-gray-300'>
          <p className='font-medium text-sm'>Compare</p>
          <IoCopyOutline className='cursor-pointer text-blue-600' onClick={() => dispatch({ type: OPEN_COMPARE_MODAL, payload: true })} />
        </div>
      </div>
    </>
  )
}

export default ProductViewOption