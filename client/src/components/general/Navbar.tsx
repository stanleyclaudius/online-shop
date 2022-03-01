import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import SearchModal from './../modal/SearchModal'
import AuthenticationModal from './../modal/AuthenticationModal'

const Navbar = () => {
  const [openNavbarSearch, setOpenNavbarSearch] = useState(false)
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false)
  const [openLike, setOpenLike] = useState(false)

  const navbarSearchRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const authenticationRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const likeRef = useRef() as React.MutableRefObject<HTMLDivElement>

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

  return (
    <>
      <div className='flex items-center justify-between bg-[#3853D8] text-white px-7 py-4 drop-shadow-xl sticky top-0 z-[999]'>
        <div onClick={() => setOpenNavbarSearch(true)}>
          <AiOutlineSearch className='text-lg cursor-pointer' />
        </div>
        <div className='font-bold font-opensans tracking-widest'>
          SNEAKERSHUB
        </div>
        <div className='flex items-center gap-3 md:gap-6'>
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
          <AiOutlineShoppingCart className='text-lg cursor-pointer' />
        </div>
      </div>

      <SearchModal navbarSearchRef={navbarSearchRef} openNavbarSearch={openNavbarSearch} setOpenNavbarSearch={setOpenNavbarSearch} />
      <AuthenticationModal authenticationRef={authenticationRef} openAuthenticationModal={openAuthenticationModal} setOpenAuthenticationModal={setOpenAuthenticationModal} />
    </>
  )
}

export default Navbar