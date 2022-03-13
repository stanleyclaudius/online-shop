import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai'
import { IoCopyOutline } from 'react-icons/io5'
import { addToCart } from '../../redux/actions/cartActions'
import { numberFormatter } from '../../utils/numberFormatter'
import { IProductData } from './../../redux/types/productTypes'
import { RootStore } from './../../utils/Interface'
import { ALERT } from './../../redux/types/alertTypes'

interface IProps {
  product: IProductData
}
  
const Detail: React.FC<IProps> = ({ product }) => {
  const [currImage, setCurrImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState(0)
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleClickSize = (item: number) => {
    setSelectedSize(item)
    setQty(1)
  }

  const handleChangeQty = (type: string) => {
    if (!selectedSize) return

    let correspondingStock = 0
    product.stock.forEach(item => {
      if (item.size === selectedSize) {
        correspondingStock = item.stock
      }
    })

    if (type === 'increase') {
      let newQty = qty + 1
      if (newQty > correspondingStock) {
        newQty -= 1
      }
      setQty(newQty)
    } else {
      let newQty = qty - 1
      if (newQty < 1) {
        newQty += 1
      }
      setQty(newQty)
    }
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please select color and size'
        }
      })
    }
    dispatch(addToCart(product?._id!, product.discount, selectedColor, selectedSize, qty, auth.token!))
    
    return dispatch({
      type: ALERT,
      payload: {
        success: 'Item added to cart.'
      }
    })
  }

  useEffect(() => {
    if (product?.images) {
      setCurrImage(product?.images[0])
    }

    return () => setCurrImage('')
  }, [product?.images])

  return (
    <div className='flex md:flex-row flex-col-reverse flex-col items-center md:pl-16 pl-8 py-10 md:pr-48 pr-8'>
      <div className='flex-[2] md:mt-0 mt-8'>
        <p className='tracking-widest text-blue-600 text-xs font-bold mb-2 uppercase'>{(typeof product?.category === 'string') ? product?.category : product?.category.name}</p>
        <h1 className='mb-5 font-oswald tracking-wide text-xl'>{product?.name}</h1>
        <div className='flex items-center gap-7 mb-5'>
          <div className='flex'>
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
            <AiFillStar className='text-orange-300 text-lg' />
          </div>
          <p className='text-gray-400 text-sm'>23 Reviews</p>
        </div>
        <div className='flex items-center gap-16'>
          <div>
            <p className='tracking-widest text-blue-600 text-xs font-bold mb-3'>COLORS</p>
            <div className='flex items-center gap-2'>
              {
                product?.colors.map((item, idx) => (
                  <div key={idx} className={`w-5 h-5 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2 ${selectedColor === item ? 'outline outline-2 outline-gray-300 outline-offset-2' : undefined}`} style={{ background: item }} onClick={() => setSelectedColor(item)} />
                ))
              }
            </div>
          </div>
          <div>
            <p className='tracking-widest text-blue-600 text-xs font-bold mb-3'>SIZE</p>
            <div className='flex items-center gap-3'>
              {
                product?.sizes.sort().map((item, idx) => (
                  <p key={idx} className={`text-sm cursor-pointer hover:text-black hover:font-bold ${selectedSize === item ? 'font-bold text-black' : 'text-gray-400'}`} onClick={() => handleClickSize(item)}>{item}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-center items-start gap-10 md:mt-5 mt-8'> 
          <div className='flex items-center gap-9'>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>{numberFormatter(product?.discount ? product?.price - ((product?.discount / 100) * product?.price) : product?.price)}</p>
              {
                product?.discount !== 0 &&
                <p className='text-gray-400 text-sm line-through'>{numberFormatter(product?.price)}</p>
              }
            </div>
            {
              product?.discount !== 0 &&
              <div className='text-xs text-white rounded-md bg-black w-fit p-1 font-bold'>- {product?.discount}%</div>
            }
          </div>
          <div className='flex items-center gap-5 md:mt-0 -mt-3'>
            <div className='flex gap-2'>
              <div className={`w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0] ${!selectedSize ? 'bg-gray-300' : undefined} ${!selectedSize ? 'hover:bg-gray-300' : undefined}`} onClick={() => handleChangeQty('decrease')}>-</div>
              <input type='text' value={qty} disabled className='w-[40px] rounded-md bg-gray-100 border border-gray-300 text-center text-sm' />
              <div className={`w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0] ${!selectedSize ? 'bg-gray-300' : undefined} ${!selectedSize ? 'hover:bg-gray-300' : undefined}`} onClick={() => handleChangeQty('increase')}>+</div>
            </div>
            <button
              onClick={handleAddToCart}
              className='flex items-center bg-[#3552DC] hover:bg-[#122DB0] rounded-full px-5 py-2 text-white text-sm gap-3 drop-shadow-xl font-bold'
            >
              <AiOutlineShoppingCart />
              Buy
            </button>
          </div>
        </div>
        <div className='flex items-center gap-8 mt-7'>
          <p className='flex items-center gap-2 text-gray-500 md:text-sm text-xs'>
            <IoCopyOutline />
            COMPARE
          </p>
          <p className='flex items-center gap-2 text-gray-500 md:text-sm text-xs'>
            <AiOutlineHeart />
            ADD TO WISHLIST
          </p>
        </div>
      </div>
      <div className='flex-1 flex flex-col md:flex-row items-center gap-10'>
        <img src={currImage} alt={product?.name} />
        <div className='flex md:flex-col flex-row gap-4'>
          {
            product?.images.map((item, idx) => (
              <div
                onClick={() => setCurrImage(item)}
                className='border border-gray-300 border-2 w-12 h-9 rounded-md p-1 cursor-pointer'
              >
                <img src={item} alt={product?.name} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Detail