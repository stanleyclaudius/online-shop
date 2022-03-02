import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { FaClipboardList, FaUserEdit } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import SearchModal from './../modal/SearchModal'
import AuthenticationModal from './../modal/AuthenticationModal'

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

  return (
    <>
      <div className='flex items-center justify-between bg-[#3853D8] text-white px-7 py-4 drop-shadow-xl sticky top-0 z-[999]'>
        <div onClick={() => setOpenNavbarSearch(true)}>
          <AiOutlineSearch className='text-lg cursor-pointer' />
        </div>
        <Link to='/' className='font-bold font-opensans tracking-widest md:translate-x-16'>
          SNEAKERSHUB
        </Link>
        <div className='flex items-center gap-3 md:gap-6'>
          <div className='relative'>
            <div className='w-6 h-6 rounded-full bg-gray-100 cursor-pointer' onClick={() => setOpenProfileDropdown(!openProfileDropdown)}></div>
            <div ref={profileRef} className={`${openProfileDropdown ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute w-[200px] bg-white right-0 translate-y-3 rounded-md shadow-xl text-black font-opensans`}>
              <div className='flex items-center gap-2 border-b border-gray-300 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-tl-md rounded-tr-md'>
                <FaUserEdit />
                <p>Edit Profile</p>
              </div>
              <Link to='/history' className='flex items-center gap-2 border-b border-gray-300 px-3 py-2 hover:bg-gray-100 cursor-pointer'>
                <FaClipboardList />
                <p>Transaction History</p>
              </Link>
              <div className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-bl-md rounded-br-md'>
                <MdLogout />
                <p>Logout</p>
              </div>
            </div>
          </div>
          <AiOutlineUser className='text-lg cursor-pointer' onClick={() => setOpenAuthenticationModal(true)} />
          <div className='relative'>
            <AiOutlineHeart onClick={() => setOpenLike(!openLike)} className='text-lg cursor-pointer' />
            <div ref={likeRef} className={`${openLike ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute w-[300px] bg-white right-0 translate-y-3 rounded-md shadow-xl`}>
              <div className='font-opensans text-black flex items-center p-3'>
                <div className='w-20 h-20 bg-gray-300 flex items-center justify-center p-2'>
                  <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="" />
                </div>
                <div className='ml-3'>
                  <h2 className='font-oswald text-lg tracking-wide'>Product name goes here</h2>
                  <p className='my-1 text-sm'>IDR 500K</p>
                  <p className='text-xs text-red-500 cursor-pointer hover:underline'>Remove</p>
                </div>
              </div>
            </div>
          </div>
          <div className='relative'>
            <AiOutlineShoppingCart className='text-lg cursor-pointer' onClick={() => setOpenCart(!openCart)} />
            <div ref={cartRef} className={`${openCart ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute w-[300px] bg-white right-0 translate-y-3 rounded-md shadow-xl`}>
              <div className='max-h-[250px] overflow-auto hide-scrollbar'>
                <div className='font-opensans text-black flex items-center p-3'>
                  <div className='w-20 h-24 bg-gray-300 flex items-center justify-center p-2'>
                    <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt="" />
                  </div>
                  <div className='ml-3'>
                    <h2 className='font-oswald text-lg tracking-wide'>Product name goes here</h2>
                    <p className='mt-1 mb-2 text-sm'>IDR 500K</p>
                    <div className='flex items-center justify-between'>
                      <div className='flex gap-2'>
                        <div className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0]'>-</div>
                        <input type='text' value={2} disabled className='w-[40px] rounded-md bg-gray-100 border border-gray-300 text-center text-sm' />
                        <div className='w-6 h-6 rounded-full text-white font-bold flex items-center justify-center bg-[#3552DC] cursor-pointer hover:bg-[#122DB0]'>+</div>
                      </div>
                      <IoMdTrash className='text-red-500 text-xl cursor-pointer' />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='font-opensans text-black px-3 py-2 border-t border-gray-300 flex items-center justify-between'>
                  <h1 className='text-sm'>Total Price</h1>
                  <p className='text-sm font-bold'>IDR 500K</p>
                </div>
                <div className='px-3 pt-2 pb-3 flex items-center justify-end'>
                  <button className='text-sm rounded-md px-3 py-2 transition-[background] bg-[#3552DC] hover:bg-[#122DB0]'>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchModal navbarSearchRef={navbarSearchRef} openNavbarSearch={openNavbarSearch} setOpenNavbarSearch={setOpenNavbarSearch} />
      <AuthenticationModal authenticationRef={authenticationRef} openAuthenticationModal={openAuthenticationModal} setOpenAuthenticationModal={setOpenAuthenticationModal} />
    </>
  )
}

export default Navbar