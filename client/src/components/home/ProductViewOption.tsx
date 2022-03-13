import { useDispatch } from 'react-redux'
import { BiChevronDown } from 'react-icons/bi'
import { BsFilter } from 'react-icons/bs'
import { IoCopyOutline, IoGrid } from 'react-icons/io5'
import { OPEN_COMPARE_MODAL } from './../../redux/types/compareTypes'

interface IProps {
  openFilter: boolean
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductViewOption: React.FC<IProps> = ({ openFilter, setOpenFilter }) => {
  const dispatch = useDispatch()

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
        <div className='flex items-center justify-between px-5 py-3 border-r border-b border-gray-300'>
          <div className='flex gap-3 text-sm font-medium'>
            <p>Sort By :</p>
            <p>Price $ - $$</p>
          </div>
          <BiChevronDown className='cursor-pointer' />
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