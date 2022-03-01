import { BsLink45Deg } from 'react-icons/bs'
import ProductCard from './../../components/general/ProductCard'
import Navbar from './../../components/general/Navbar'
import Header from './../../components/home/Header'
import Detail from './../../components/product/Detail'
import ReviewContainer from './../../components/product/ReviewContainer'
import Subscribe from './../../components/general/Subscribe'
import Footer from './../../components/general/Footer'

const ProductDetail = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='m-auto bg-white w-10/12 drop-shadow-2xl -translate-y-10 font-opensans'>
        <Detail />
        <div className='flex gap-6 border-t border-gray-300 px-16 py-5'>
          <div className='text-xs tracking-wider'>REVIEWS</div>
          <div className='text-xs tracking-wider'>QnA</div>
        </div>
        <ReviewContainer />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-300'>
          <div className='border-b border-r border-gray-300 bg-[#161616] flex items-center justify-center flex-col gap-4'>
            <BsLink45Deg className='text-blue-700 text-8xl' />
            <p className='font-oswald text-white font-bold text-2xl'>SIMILAR PRODUCTS</p>
            <p className='text-gray-400 text-sm'>Similar products that you might like</p>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  )
}

export default ProductDetail