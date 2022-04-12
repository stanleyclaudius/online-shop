import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/general/Loader'
import { getAllTransactions } from '../redux/actions/transactionActions'
import { ICheckoutData } from '../redux/types/checkoutTypes'
import { RootStore } from '../utils/Interface'
import { numberFormatter } from '../utils/numberFormatter'
import Layout from './../components/admin/Layout'
import HistoryModal from './../components/modal/HistoryModal'
import NotFound from './../components/general/NotFound'
import HeadInfo from '../utils/HeadInfo'

const Transaction = () => {
  const [currPage, setCurrPage] = useState(1)
  const [transactions, setTransactions] = useState<ICheckoutData[]>([])
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ICheckoutData>()

  const dispatch = useDispatch()
  const { auth, alert, transaction } = useSelector((state: RootStore) => state)

  const detailModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handlePaginationArrow = (type: string) => {
    let newPage = 0

    if (type === 'prev') {
      newPage = currPage - 1
      if (newPage < 1) {
        newPage = 1
      }
    } else if (type === 'next') {
      newPage = currPage + 1
      if (newPage > transaction.totalPage) {
        newPage = transaction.totalPage
      }
    }

    setCurrPage(newPage)
  }

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
    dispatch(getAllTransactions(auth.token!, currPage))
  }, [dispatch, auth.token, currPage])

  useEffect(() => {
    setTransactions(transaction.data)
  }, [transaction.data])
  
  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <HeadInfo title='Transaction Management' />
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
                    <th>Order By</th>
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
                      <tr key={item._id} className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.user?.name}</td>
                        <td>{new Date(`${item.createdAt}`).toLocaleDateString()}</td>
                        <td>{item.discount ? `${item.discount.value}%` : '-'}</td>
                        <td>{numberFormatter(item.totalPrice)},00</td>
                        <td>{item.items.length}</td>
                        <td>OVO</td>
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

              {
                transaction.totalPage > 1 &&
                <>
                  <div className='flex mt-6 border border-gray-300 rounded-md w-fit float-right'>
                    {
                      currPage > 1 &&
                      <div onClick={() => handlePaginationArrow('prev')} className='cursor-pointer py-2 px-4 border-r border-gray-300'>&lt;</div>
                    }

                    {
                      Array.from(Array(transaction.totalPage).keys()).map((_, idx) => (
                        <div key={idx} onClick={() => setCurrPage(idx + 1 )} className={`cursor-pointer py-2 px-4 border-r border-gray-300 ${currPage === idx + 1 ? 'bg-[#3552DC] text-white' : undefined}`}>{idx + 1}</div>
                      ))
                    }

                    {
                      currPage < transaction.totalPage &&
                      <div onClick={() => handlePaginationArrow('next')} className='cursor-pointer py-2 px-4'>&gt;</div>
                    }
                  </div>
                  <div className='clear-both' />
                </>
              }
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