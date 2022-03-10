import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from './../../utils/Interface'
import { getHomeProduct, getProduct } from './../../redux/actions/productActions'
import { getBrand } from './../../redux/actions/brandActions'
import { getHomeCategory } from './../../redux/actions/categoryActions'
import { IProductData } from './../../redux/types/productTypes'
import HighlightedItem from './HighlightedItem'
import ProductCard from './../general/ProductCard'
import Filter from './Filter'
import ProductViewOption from './ProductViewOption'
import Pagination from './../general/Pagination'

const ProductList = () => {
  const [openFilter, setOpenFilter] = useState(false)
  const [products, setProducts] = useState<IProductData[]>([])

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string[]>([])
  const [selectedSize, setSelectedSize] = useState<number[]>([])
  const [selectedColor, setSelectedColor] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number[]>([])
  const [selectedPage, setSelectedPage] = useState(1)

  const filterRef = useRef() as React.MutableRefObject<HTMLDivElement>
  
  const dispatch = useDispatch()
  const { brand, homeProduct, homeCategory: category } = useSelector((state: RootStore) => state)

  useEffect(() => {
    dispatch(getHomeProduct(selectedCategory, selectedBrand, selectedSize, selectedColor, selectedPrice, selectedPage))
  }, [dispatch, selectedCategory, selectedBrand, selectedSize, selectedColor, selectedPrice, selectedPage])

  useEffect(() => {
    dispatch(getProduct())
    dispatch(getHomeCategory())
    dispatch(getBrand())
  }, [dispatch])

  useEffect(() => {
    setProducts(homeProduct.data)
  }, [homeProduct])

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
          categories={category.data}
          brands={brand.data}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setSelectedPrice={setSelectedPrice}
          setSelectedPage={setSelectedPage}
        />
        <div className='flex-[3]'>
          <ProductViewOption
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
              products.map(item => (
                <ProductCard product={item} />
              ))
            }
          </div>
          {
            homeProduct.totalPage > 1 &&
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              totalPage={homeProduct.totalPage}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default ProductList