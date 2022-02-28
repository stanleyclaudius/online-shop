import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

interface IProps {
  navbarSearchRef: React.MutableRefObject<HTMLDivElement>,
  openNavbarSearch: boolean
  setOpenNavbarSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const Search: React.FC<IProps> = ({ navbarSearchRef, openNavbarSearch, setOpenNavbarSearch }) => {
  const [search, setSearch] = useState('')

  return (
    <div className={`${openNavbarSearch ? 'opacity-100' : 'opacity-0'} ${openNavbarSearch ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-start py-20 px-5`}>
      <div ref={navbarSearchRef} className={`${openNavbarSearch ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[600px] bg-white p-5 rounded-md`}>
        <div className='flex items-center justify-between'>
          <h2 className='font-opensans'>Search Product</h2>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenNavbarSearch(false)} />
        </div>
        <div className='flex items-center border rounded-md border-gray-400 p-3 mt-5'>
          <AiOutlineSearch />
          <input type='text' value={search} onChange={e => setSearch(e.target.value)} className='outline-0 flex-1 ml-3 text-sm font-opensans' placeholder='Enter product name ...' />
        </div>
      </div>
    </div>
  )
}

export default Search