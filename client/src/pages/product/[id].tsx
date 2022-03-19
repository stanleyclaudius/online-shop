import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsLink45Deg } from 'react-icons/bs'
import { getDataAPI } from './../../utils/fetchData'
import { IProductData } from './../../redux/types/productTypes'
import Navbar from './../../components/general/Navbar'
import Header from './../../components/home/Header'
import Detail from './../../components/product/Detail'
import ReviewContainer from './../../components/product/ReviewContainer'
import ProductCard from './../../components/general/ProductCard'
import Subscribe from './../../components/general/Subscribe'
import Footer from './../../components/general/Footer'
import Loader from './../../components/general/Loader'

const ProductDetail = () => {
  const [product, setProduct] = useState<IProductData>()
  const [similarProducts, setSimilarProducts] = useState<IProductData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    setLoading(true)
    getDataAPI(`product/${id}`)
      .then(res => {
        setProduct(res.data.product)
        setLoading(false)
      })
      .catch(err => {
        setError(err.response.data.msg)
        setLoading(false)
      })
    
    return () => setProduct(undefined)
  }, [id])

  useEffect(() => {
    if (!product) return

    getDataAPI(`product/similar/${product?._id}/${(typeof product.category === 'string') ? product?.category : product?.category._id}`)
      .then(res => {
        setSimilarProducts(res.data.products)
      })

    return () => setSimilarProducts([])
  }, [product])

  return (
    <>
      <Navbar />
      <Header />
      {
        loading
        ? <Loader size='xl' />
        : error
          ? (
            <div className='m-auto bg-white w-10/12 py-20 drop-shadow-2xl -translate-y-10 font-opensans'>
              <div className='bg-red-500 rounded-md w-8/12 text-center m-auto'>
                <p className='text-white p-4'>Product Not Found</p>
              </div>
            </div>
          )
          : (
              <div className='m-auto bg-white w-10/12 drop-shadow-2xl -translate-y-10 font-opensans'>
                <Detail product={product!} />
                <div className='flex gap-6 border-t border-gray-300 px-16 py-5'>
                  <div className='text-xs tracking-wider font-bold cursor-pointer text-[#3552DC]'>
                    REVIEWS
                  </div>
                  <div className='text-xs tracking-wider cursor-pointer'>
                    QnA
                  </div>
                </div>
                <ReviewContainer id={`${id}`} />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-300'>
                  <div className='border-b border-r border-gray-300 bg-[#161616] flex items-center justify-center flex-col gap-4 py-10 md:py-0'>
                    <BsLink45Deg className='text-blue-700 text-8xl' />
                    <p className='font-oswald text-white font-bold text-2xl'>SIMILAR PRODUCTS</p>
                    <p className='text-gray-400 text-sm'>Similar products that you might like</p>
                  </div>
                  {
                    similarProducts.length > 0 &&
                    (
                      <>
                        {
                          similarProducts.map(item => (
                            <ProductCard key={item._id} view='grid' product={item} />
                          ))
                        }
                      </>
                    )
                  }
                </div>
              </div>
            )
      }
      <Subscribe />
      <Footer />
    </>
  )
}

export default ProductDetail