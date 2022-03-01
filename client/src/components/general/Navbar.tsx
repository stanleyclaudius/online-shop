import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import SearchModal from './../modal/SearchModal'
import AuthenticationModal from './../modal/AuthenticationModal'

const Navbar = () => {
  const [openNavbarSearch, setOpenNavbarSearch] = useState(false)
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false)

  const navbarSearchRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const authenticationRef = useRef() as React.MutableRefObject<HTMLDivElement>

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
          <AiOutlineHeart className='text-lg cursor-pointer' />
          <AiOutlineShoppingCart className='text-lg cursor-pointer' />
        </div>
      </div>

      <SearchModal navbarSearchRef={navbarSearchRef} openNavbarSearch={openNavbarSearch} setOpenNavbarSearch={setOpenNavbarSearch} />
      <AuthenticationModal authenticationRef={authenticationRef} openAuthenticationModal={openAuthenticationModal} setOpenAuthenticationModal={setOpenAuthenticationModal} />
    </>
  )
}

export default Navbar