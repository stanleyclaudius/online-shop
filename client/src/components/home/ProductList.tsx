import { useState, useEffect, useRef } from 'react'
import { IProductData } from './../../redux/types/productTypes'
import { IBrandData } from './../../redux/types/brandTypes'
import { ICategoryData } from './../../redux/types/categoryTypes'
import HighlightedItem from './HighlightedItem'
import ProductCard from '../general/ProductCard'
import Filter from './Filter'
import ProductViewOption from './ProductViewOption'
import Pagination from '../general/Pagination'

interface IProps {
  products: IProductData[]
  brands: IBrandData[]
  categories: ICategoryData[]
}

const ProductList: React.FC<IProps> = ({ products, brands, categories }) => {
  const [openFilter, setOpenFilter] = useState(false)

  const filterRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openFilter && filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFilter])

  return (
    <div className='m-auto bg-white w-10/12 drop-shadow-2xl -translate-y-10'>
      <HighlightedItem />
      <div className='flex relative'>
        <Filter
          filterRef={filterRef}
          openFilter={openFilter}
          categories={categories}
          brands={brands}
        />
        <div className='flex-[3]'>
          <ProductViewOption
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
              products.map(product => (
                <ProductCard product={product} />
              ))
            }
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default ProductList