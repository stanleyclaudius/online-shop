import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import Search from './Search'

const Navbar = () => {
  const [openNavbarSearch, setOpenNavbarSearch] = useState(false)

  const navbarSearchRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openNavbarSearch && navbarSearchRef.current && !navbarSearchRef.current.contains(e.target as Node)) {
        setOpenNavbarSearch(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNavbarSearch])

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
          <AiOutlineUser className='text-lg cursor-pointer' />
          <AiOutlineHeart className='text-lg cursor-pointer' />
          <AiOutlineShoppingCart className='text-lg cursor-pointer' />
        </div>
      </div>

      <Search navbarSearchRef={navbarSearchRef} openNavbarSearch={openNavbarSearch} setOpenNavbarSearch={setOpenNavbarSearch} />
    </>
  )
}

export default Navbar