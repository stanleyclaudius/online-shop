import HighlightedItem from './HighlightedItem'
import ProductCard from '../general/ProductCard'
import Filter from './Filter'
import ProductViewOption from './ProductViewOption'

const ProductList = () => {
  return (
    <div className='m-auto bg-white w-10/12 drop-shadow-2xl -translate-y-10'>
      <HighlightedItem />
      <div className='flex'>
        <Filter />
        <div className='flex-[3]'>
          <ProductViewOption />
          <div className='grid grid-cols-3'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList