import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/general/Loader'
import { getAllTransactions } from '../redux/actions/transactionActions'
import { ICheckoutData } from '../redux/types/checkoutTypes'
import { RootStore } from '../utils/Interface'
import { numberFormatter } from '../utils/numberFormatter'
import Layout from './../components/admin/Layout'
import HistoryModal from './../components/modal/HistoryModal'

const Transaction = () => {
  const [transactions, setTransactions] = useState<ICheckoutData[]>([])
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ICheckoutData>()

  const dispatch = useDispatch()
  const { auth, alert, transaction } = useSelector((state: RootStore) => state)

  const detailModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickDetail = (item: ICheckoutData) => {
    setOpenDetailModal(true)
    setSelectedItem(item)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDetailModal && detailModalRef.current && !detailModalRef.current.contains(e.target as Node)) {
        setOpenDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDetailModal])

  useEffect(() => {
    dispatch(getAllTransactions(auth.token!))
  }, [dispatch, auth.token])

  useEffect(() => {
    setTransactions(transaction.data)
  }, [transaction.data])

  return (
    <>
      <Layout>
        <h1 className='text-2xl tracking-wide font-oswald'>Transaction Management</h1>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
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
                  {
                    transactions.map((item, idx) => (
                      <tr className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item._id}</td>
                        <td>{new Date(`${item.createdAt}`).toLocaleDateString()}</td>
                        <td>{item.discount ? `${item.discount}%` : '-'}</td>
                        <td>{numberFormatter(item.totalPrice)},00</td>
                        <td>{item.items.length}</td>
                        <td>{item.paymentMethod === 'cc' ? 'Credit Card' : item.paymentMethod === 'ovo' ? 'OVO' : 'Not Found'}</td>
                        <td>
                          <button
                            onClick={() => handleClickDetail(item)}
                            className='bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-[background]'
                          >
                            Detail
                          </button>
                        </td>
                      </tr>   
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </Layout>

      <HistoryModal
        modalRef={detailModalRef}
        openHistoryModal={openDetailModal}
        setOpenHistoryModal={setOpenDetailModal}
        selectedItem={selectedItem}
      />
    </>
  )
}

export default Transaction