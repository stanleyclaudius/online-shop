import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { IoCopyOutline } from 'react-icons/io5'
import { numberFormatter } from './../../utils/numberFormatter'
import { IProductData } from './../../redux/types/productTypes'
import { addWishlist, deleteWishlistItem } from './../../redux/actions/wishlistActions'
import { RootStore } from './../../utils/Interface'
import { SET_COMPARE_DATA } from '../../redux/types/compareTypes'

interface IProps {
  product: IProductData
  view: string
}

const ProductCard: React.FC<IProps> = ({ view, product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, wishlist } = useSelector((state: RootStore) => state)

  const handleClickWishlisted = () => {
    if (isWishlisted) {
      dispatch(deleteWishlistItem(`${product._id}`, auth.token!))
    } else {
      dispatch(addWishlist(product, auth.token!))
    }
  }

  useEffect(() => {
    const findWishlist = wishlist.find(item => item.product._id === product._id)
    if (findWishlist) {
      setIsWishlisted(true)
    }

    return () => setIsWishlisted(false)
  }, [wishlist, product._id])

  return (
    <div className={`product-card border-b border-r border-gray-300 px-7 ${view === 'grid' ? 'pt-14' : 'pt-4'} pb-4 relative relative`}>
      {
        view === 'grid'
        ? <>
          {
            product.discount !== 0 &&
            <div className='absolute top-4 right-4 font-opensans text-xs bg-black w-fit text-white rounded-md p-2 font-bold'>- {product.discount}%</div>
          }
          <div className='w-fit object-contain'>
            <img src={product.images[0]} alt={product.name} />
          </div>
          <h1 className='font-oswald mt-6 mb-2 text-xl'>{product.name}</h1>
          <p className='font-opensans text-sm'>{numberFormatter(product.price)},00</p>
          <div className='product-detail opacity-0 drop-shadow-2xl absolute top-0 right-0 bg-[#415DDA] w-full h-full px-5 py-7 flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-white font-bold uppercase'>
                {(typeof product.category === 'string') ? product.category : product.category.name}
              </p>
              {
                product.discount !== 0 &&
                <div className='font-opensans text-xs bg-black w-fit text-white rounded-md p-2 font-bold'>- {product.discount}%</div>
              }
            </div>
            <div className='flex items-center gap-7'>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className='flex items-center gap-2 bg-white rounded-full px-7 font-medium py-3 text-[#415FFA] text-sm'
              >
                <BiDetail />
                Detail
              </button>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => dispatch({ type: SET_COMPARE_DATA, payload: product })}
                  className='rounded-full text-white bg-[#667AD3] w-9 h-9 flex items-center justify-center'
                >
                  <IoCopyOutline />
                </button>
                <button
                  onClick={handleClickWishlisted}
                  className='rounded-full text-white bg-[#667AD3] w-9 h-9 flex items-center justify-center'
                >
                  {
                    isWishlisted
                    ? <AiFillHeart />
                    : <AiOutlineHeart />
                  }
                </button>
              </div>
            </div>
            <div className='text-white'>
              <p className='font-oswald text-lg mb-2'>{product.name}</p>
              <p className='text-sm font-bold'>{numberFormatter(product.price)},00</p>
            </div>
          </div>
        </>
        : (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-6'>
              <div className='w-20 h-20 border border-gray-300 rounded-md p-2 flex items-center justify-center'>
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div>
                <div className='flex items-center gap-5'>
                  <Link to={`/product/${product._id}`}><h1 className='font-oswald text-xl'>{product.name}</h1></Link>
                  {
                    product.discount !== 0 && <p className='bg-black text-white rounded-md text-xs p-1'>-15%</p>
                  }
                </div>
                <p className='mt-2 text-sm'>{numberFormatter(product.price)},00</p>
              </div>
            </div>
            <div className='flex items-center gap-6 text-lg text-[#415DDA]'>
              <IoCopyOutline onClick={() => dispatch({ type: SET_COMPARE_DATA, payload: product })} className='cursor-pointer' />
              <div onClick={handleClickWishlisted} className='cursor-pointer'>
                {
                  isWishlisted
                  ? <AiFillHeart />
                  : <AiOutlineHeart />
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductCard