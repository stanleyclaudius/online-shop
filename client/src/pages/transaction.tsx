import { useState, useEffect, useRef } from 'react'
import Layout from './../components/admin/Layout'
import HistoryModal from './../components/modal/HistoryModal'

const Transaction = () => {
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const detailModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDetailModal && detailModalRef.current && !detailModalRef.current.contains(e.target as Node)) {
        setOpenDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDetailModal])

  return (
    <>
      <Layout>
        <h1 className='text-2xl tracking-wide font-oswald'>Transaction Management</h1>
        <div className='overflow-x-auto mt-8'>
          <table className='w-full'>
            <thead>
              <tr className='text-sm bg-[#3552DC] text-white'>
                <th className='p-3'>No</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Total Discount</th>
                <th>Net Price</th>
                <th>Total Items</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-sm text-center bg-gray-100'>
                <td className='p-3'>1</td>
                <td>622312dfds343f</td>
                <td>27 January 2022</td>
                <td>IDR 15K</td>
                <td>IDR 1,250K</td>
                <td>2</td>
                <td>OVO</td>
                <td>
                  <button
                    onClick={() => setOpenDetailModal(true)}
                    className='bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-[background]'
                  >
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>

      <HistoryModal
        modalRef={detailModalRef}
        openHistoryModal={openDetailModal}
        setOpenHistoryModal={setOpenDetailModal}
      />
    </>
  )
}

export default Transaction