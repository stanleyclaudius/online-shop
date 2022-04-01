import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'
import HistoryModal from './../components/modal/HistoryModal'
import { ICheckoutData } from '../redux/types/checkoutTypes'
import { RootStore } from '../utils/Interface'
import { getCheckoutHistory } from '../redux/actions/checkoutActions'
import { numberFormatter } from '../utils/numberFormatter'
import Loader from '../components/general/Loader'
import NotFound from './../components/general/NotFound'

const History = () => {
  const [checkoutHistory, setCheckoutHistory] = useState<ICheckoutData[]>([])
  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ICheckoutData>()

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, alert, checkout } = useSelector((state: RootStore) => state)

  const handleClickDetail = (item: ICheckoutData) => {
    setOpenHistoryModal(true)
    setSelectedItem(item)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openHistoryModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenHistoryModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openHistoryModal])
  
  useEffect(() => {
    dispatch(getCheckoutHistory(auth.token!))
  }, [dispatch, auth])

  useEffect(() => {
    setCheckoutHistory(checkout.data)
  }, [checkout.data])

  if (auth.user?.role !== 'user') {
    return <NotFound />
  }

  return (
    <>
      <Navbar />
      <Header />
      <div className='m-auto bg-white w-10/12 drop-shadow-2xl -translate-y-10 font-opensans p-7'>
        <h1 className='text-2xl mb-8'>Transaction History</h1>
        {
          alert.loading
          ? (
            <Loader size='xl' />
          )
          : (
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
                  {
                    checkoutHistory.map((item, idx) => (
                      <tr className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{new Date(item.createdAt!).toLocaleDateString}</td>
                        <td>{item._id!}</td>
                        <td>{item.paymentMethod === 'ovo' ? 'OVO' : 'Credit Card'}</td>
                        <td>{numberFormatter(item.totalPrice)}</td>
                        <td>{!item.discount ? 0 : numberFormatter((item.discount.value * item.totalPrice) / 100)}</td>
                        <td>{item.items.length}</td>
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
      </div>
      <Subscribe />
      <Footer />

      <HistoryModal
        modalRef={modalRef}
        openHistoryModal={openHistoryModal}
        setOpenHistoryModal={setOpenHistoryModal}
        selectedItem={selectedItem!}
      />
    </>
  )
}

export default History