import React, { useState, useEffect, useRef } from 'react'
import HistoryModal from './../components/modal/HistoryModal'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import Subscribe from './../components/general/Subscribe'
import Header from './../components/home/Header'

const History = () => {
  const [openHistoryModal, setOpenHistoryModal] = useState(false)

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openHistoryModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenHistoryModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openHistoryModal])

  return (
    <>
      <Navbar />
      <Header />
      <div className='m-auto bg-white w-10/12 drop-shadow-2xl -translate-y-10 font-opensans p-7'>
        <h1 className='text-2xl mb-8'>Transaction History</h1>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='text-sm bg-[#3552DC] text-white'>
                <th className='p-3'>No</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Payment Method</th>
                <th>Total Price</th>
                <th>Total Discount</th>
                <th>Total Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-sm text-center bg-gray-100'>
                <td className='p-3'>1</td>
                <td>27 Jan 2022</td>
                <td>637djkf838fuhfh</td>
                <td>Credit Card</td>
                <td>IDR 1,250K</td>
                <td>IDR 15K</td>
                <td>2</td>
                <td>
                  <button className='bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-[background]' onClick={() => setOpenHistoryModal(true)}>Detail</button>
                </td>
              </tr>
              <tr className='text-sm text-center bg-gray-100'>
                <td className='p-3'>1</td>
                <td>27 Jan 2022</td>
                <td>637djkf838fuhfh</td>
                <td>Credit Card</td>
                <td>IDR 1,250K</td>
                <td>IDR 15K</td>
                <td>2</td>
                <td>
                  <button className='bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-[background]' onClick={() => setOpenHistoryModal(true)}>Detail</button>
                </td>
              </tr>
              <tr className='text-sm text-center bg-gray-100'>
                <td className='p-3'>1</td>
                <td>27 Jan 2022</td>
                <td>637djkf838fuhfh</td>
                <td>Credit Card</td>
                <td>IDR 1,250K</td>
                <td>IDR 15K</td>
                <td>2</td>
                <td>
                  <button className='bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-[background]' onClick={() => setOpenHistoryModal(true)}>Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Subscribe />
      <Footer />

      <HistoryModal modalRef={modalRef} openHistoryModal={openHistoryModal} setOpenHistoryModal={setOpenHistoryModal} />
    </>
  )
}

export default History