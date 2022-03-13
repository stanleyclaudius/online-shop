import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser, AiFillDashboard } from 'react-icons/ai'
import { FaClipboardList, FaUserEdit } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import { RootStore } from './../../utils/Interface'
import { logout } from './../../redux/actions/authActions'
import { getCart, deleteItem, addToCart } from './../../redux/actions/cartActions'
import { numberFormatter } from './../../utils/numberFormatter'
import { IDeleteCartData } from './../../redux/types/cartTypes'
import SearchModal from './../modal/SearchModal'
import AuthenticationModal from './../modal/AuthenticationModal'
import { getDataAPI } from './../../utils/fetchData'
import { deleteWishlistItem, getWishlist } from './../../redux/actions/wishlistActions'

const Navbar = () => {
  const [openNavbarSearch, setOpenNavbarSearch] = useState(false)
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false)
  const [openLike, setOpenLike] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false)

  const navbarSearchRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const authenticationRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const likeRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const cartRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const profileRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { wishlist, auth, cart } = useSelector((state: RootStore) => state)

  const handleLogout = () => {
    if (!auth.token) return
    dispatch(logout(auth.token))
  }

  const handleDeleteItem = (cartData: IDeleteCartData) => {
    if (auth.token)
      cartData.token = auth.token

    dispatch(deleteItem(cartData))
  }

  const handleChangeQty = async(type: string, productId: string, color: string, size: string, qty: number) => {
    try {
      const productData = await getDataAPI(`product/${productId}`)
      const product = productData.data.product

      let correspondingStock = 0
      product.stock.forEach((item: any) => {
        if (item.size === parseInt(size)) {
          correspondingStock = item.stock
        }
      })

      let newQty = qty
      if (type === 'increase') {
        newQty = qty + 1
        if (newQty > correspondingStock) {
          newQty -= 1
        }
      } else {
        newQty = qty - 1
        if (newQty < 1) {
          newQty += 1
        }
      }

      dispatch(addToCart(productId, color, parseInt(size), newQty, auth.token!))
    } catch (err: any) {
      console.log(err.response.data.msg)
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openNavbarSearch && navbarSearchRef.current && !navbarSearchRef.current.contains(e.target as Node)) {
        setOpenNavbarSearch(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNavbarSearch])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openAuthenticationModal && authenticationRef.current && !authenticationRef.current.contains(e.target as Node)) {
        setOpenAuthenticationModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openAuthenticationModal])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openLike && likeRef.current && !likeRef.current.contains(e.target as Node)) {
        setOpenLike(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return() => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openLike])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCart && cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setOpenCart(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCart])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openProfileDropdown && profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setOpenProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openProfileDropdown])

  useEffect(() => {
    if (auth.token) {
      dispatch(getCart(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (auth.token) {
      dispatch(getWishlist(auth.token))
    }
  }, [dispatch, auth.token])

  return (
    <>
      <div className='flex items-center justify-between bg-[#3853D8] text-white px-7 py-4 drop-shadow-xl sticky top-0 z-[999]'>
        <div onClick={() => setOpenNavbarSearch(true)}>
          <AiOutlineSearch className='text-lg cursor-pointer' />
        </div>
        <Link
          to='/'
          className='font-bold font-opensans tracking-widest md:translate-x-16'
        >
          SNEAKERSHUB
        </Link>
        <div className='flex items-center gap-3 md:gap-6'>
          {
            auth.user
            ? (
              <div className='relative'>
                <div
                  onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
                  className='w-6 h-6 rounded-full bg-gray-100 cursor-pointer'
                >
                  <img src={auth.user?.avatar} alt={auth.user?.name} className='rounded-full' />
                </div>
                <div
                  ref={profileRef}
                  className={`${openProfileDropdown ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute w-[200px] bg-white right-0 translate-y-3 rounded-md shadow-xl text-black font-opensans`}
                >
                  {
                    auth.user?.role === 'user'
                    ? (
                      <>
                        <Link
                          to='/profile'
                          className='flex items-center gap-2 border-b border-gray-300 px-3 py-2 hover:bg-gray-100 rounded-tl-md rounded-tr-md'
                        >
                          <FaUserEdit />
                          <p>Edit Profile</p>
                        </Link>
                        <Link
                          to='/history'
                          className='flex items-center gap-2 border-b border-gray-300 px-3 py-2 hover:bg-gray-100'
                        >
                          <FaClipboardList />
                          <p>Transaction History</p>
                        </Link>
                      </>
                    )
                    : (
                      <Link
                        to='/dashboard'
                        className='flex items-center gap-2 border-b border-gray-300 px-3 py-2 hover:bg-gray-100 rounded-tl-md rounded-tr-md'
                      >
                        <AiFillDashboard />
                        <p>Dashboard</p>
                      </Link>
                    )
                  }
                  <div
                    onClick={handleLogout}
                    className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-bl-md rounded-br-md'
                  >
                    <MdLogout />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            )
            : (
              <AiOutlineUser
                onClick={() => setOpenAuthenticationModal(true)}
                className='text-lg cursor-pointer'
              />
            )
          }
          <div className='relative'>
            <div className='relative'>
              <AiOutlineHeart
                onClick={() => setOpenLike(!openLike)}
                className='text-lg cursor-pointer'
              />
              {
                wishlist.length > 0 &&
                <div className='absolute -top-2 -right-2 bg-orange-500 rounded-full w-4 h-4 text-white flex items-center justify-center text-xs font-bold'>
                  {wishlist.length}
                </div>
              }
            </div>
            {
              wishlist.length > 0 &&
              <div
                ref={likeRef}
                className={`${openLike ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute w-[300px] bg-white right-0 translate-y-3 rounded-md shadow-xl max-h-[350px] overflow-auto hide-scrollbar`}
              >
                {
                  wishlist.map(item => (
                    <div className='font-opensans text-black flex items-center p-3'>
                      <div className='w-20 h-20 bg-gray-300 flex items-center justify-center p-2'>
                        <img src={item.product.images[0]} alt={item.product.name} />
                      </div>
                      <div className='ml-3'>
                        <h2 className='font-oswald text-lg tracking-wide'>{item.product.name}</h2>
                        <p className='my-1 text-sm'>{numberFormatter(item.product.price)}</p>
                        <p
                          onClick={() => dispatch(deleteWishlistItem(item.product._id, auth.token!))}
                          className='text-xs text-red-500 cursor-pointer hover:underline'
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            }
          </div>
          <div className='relative'>
            <div className='relative'>
              <AiOutlineShoppingCart
                onClick={() => setOpenCart(!openCart)}
                className='text-lg cursor-pointer'
              />
              {
                cart.length > 0 &&
                <div className='absolute -top-2 -right-2 bg-orange-500 rounded-full w-4 h-4 text-white flex items-center justify-center text-xs font-bold'>
                  {cart.length}
                </div>
              }
            </div>
            {
              cart.length > 0 &&
              <div
                ref={cartRef}
                className={`${openCart ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute w-[330px] bg-white right-0 translate-y-3 rounded-md shadow-xl`}
              >
                <div className='max-h-[250px] overflow-auto hide-scrollbar'>
                  {
                    cart.length > 0 &&
                    cart.map(item => (
                      <div key={`${item.product ? item._id : `${item.name}-${item.color}-${item.size}`}`} className='font-opensans text-black flex items-center p-3'>
                        <div className='w-20 h-24 rounded-md border border-gray-300 flex items-center justify-center p-2'>
                          <img src={item.product ? item.product.images[0] : item.image} alt={item.product ? item.product.name : item.name} />
                        </div>
                        <div className='w-full ml-3'>
                          <div className='flex items-center gap-5'>
                            <h2 className='font-oswald text-lg tracking-wide'>{item.product ? item.product.name : item.name}</h2>
                            <p className='text-sm bg-gray-200 rounded-md px-2 py-1'>{item.size}</p>
                            <div className='w-4 h-4 outline outline-2 outline-gray-300 outline-offset-2 rounded-full' style={{ background: item.color }} />
                          </div>
                          <p className='mt-1 mb-2 text-sm'>{numberFormatter(item.product ? item.product.price : parseInt(item.price))}</p>
                          <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                              <div
                                onClick={() => handleChangeQty(
                                  'decrease',
                                  item.product ? item.product._id : item._id,
                                  item.color,
                                  item.size as string,
                                  item.qty
                                )}
                                className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0] transition-[background]'
                              >
                                -
                              </div>
                              <input type='text' value={item.qty} disabled className='w-[40px] rounded-md bg-gray-100 border border-gray-300 text-center text-sm' />
                              <div
                                onClick={() => handleChangeQty(
                                  'increase',
                                  item.product ? item.product._id : item._id,
                                  item.color,
                                  item.size as string,
                                  item.qty
                                )}
                                className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0] transition-[background]'
                              >
                                +
                              </div>
                            </div>
                            <IoMdTrash
                              onClick={() => handleDeleteItem({
                                productId: item.product ? item.product._id : item._id,
                                productSize: item.size,
                                productColor: item.color
                              })}
                              className='text-red-500 text-xl cursor-pointer'
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div>
                  <div className='font-opensans text-black px-3 py-2 border-t border-gray-300 flex items-center justify-between'>
                    <h1 className='text-sm'>Total Price</h1>
                    <p className='text-sm font-bold'>{numberFormatter(cart.reduce((acc, item) => (acc + (item.product ? item.product.price * item.qty : parseInt(item.price) * item.qty)), 0))}</p>
                  </div>
                  <div className='px-3 pt-2 pb-3 flex items-center justify-end'>
                    <button className='text-sm rounded-md px-3 py-2 transition-[background] bg-[#3552DC] hover:bg-[#122DB0]'>Checkout</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <SearchModal
        navbarSearchRef={navbarSearchRef}
        openNavbarSearch={openNavbarSearch}
        setOpenNavbarSearch={setOpenNavbarSearch}
      />
      
      <AuthenticationModal
        authenticationRef={authenticationRef}
        openAuthenticationModal={openAuthenticationModal}
        setOpenAuthenticationModal={setOpenAuthenticationModal}
      />
    </>
  )
}

export default Navbar