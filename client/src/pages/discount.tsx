import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'
import CreateDiscountModal from './../components/modal/CreateDiscountModal'
import { RootStore } from '../utils/Interface'
import { IDiscountData } from '../redux/types/discountTypes'
import { deleteDiscount, getDiscount } from '../redux/actions/discountActions'
import Loader from '../components/general/Loader'

const Discount = () => {
  const [discounts, setDiscounts] = useState<IDiscountData[]>([])
  const [openCreateDiscountModal, setOpenCreateDiscountModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [selectedItem, setSelectedItem] = useState<IDiscountData>({ _id: '', code: '', value: 0 })
  
  const dispatch = useDispatch()
  const { auth, alert, discount } = useSelector((state: RootStore) => state)

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const createDiscountRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleUpdateButtonClicked = (item: IDiscountData) => {
    setSelectedItem(item)
    setOpenCreateDiscountModal(true)
  }

  const handleDeleteButtonClicked = (id: string) => {
    setSelectedId(id)
    setOpenDeleteModal(true)
  }

  const handleDeleteDiscount = async() => {
    await dispatch(deleteDiscount(selectedId, auth.token!))
    setOpenDeleteModal(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCreateDiscountModal && createDiscountRef.current && !createDiscountRef.current.contains(e.target as Node)) {
        setOpenCreateDiscountModal(false)
        setSelectedItem({ _id: '', code: '', value: 0 })
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCreateDiscountModal])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDeleteModal && deleteModalRef.current && !deleteModalRef.current.contains(e.target as Node)) {
        setOpenDeleteModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDeleteModal])

  useEffect(() => {
    dispatch(getDiscount(auth.token!))
  }, [dispatch, auth])

  useEffect(() => {
    setDiscounts(discount.data)
  }, [discount.data])

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between gap-10'>
          <h1 className='text-2xl tracking-wide font-oswald'>Discount Management</h1>
          <button
            onClick={() => setOpenCreateDiscountModal(true)}
            className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white'
          >
            Create Discount
          </button>
        </div>
        {
         alert.loading
          ? <Loader size='xl' />
          : (
            <div className='overflow-x-auto mt-8'>
              <table className='w-full'>
                <thead>
                  <tr className='text-sm bg-[#3552DC] text-white'>
                    <th className='p-3'>No</th>
                    <th>Code</th>
                    <th>Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    discounts.map((item, idx) => (
                      <tr key={item._id} className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item.code}</td>
                        <td>{item.value}%</td>
                        <td>
                          <button
                            onClick={() => handleUpdateButtonClicked(item)}
                            className='bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition-[background] mr-3'
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteButtonClicked(`${item._id}`)}
                            className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-[background]'
                          >
                            Delete
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

      <DeleteModal
        deleteModalRef={deleteModalRef}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        success={handleDeleteDiscount}
      />

      <CreateDiscountModal
        createDiscountRef={createDiscountRef}
        openCreateDiscountModal={openCreateDiscountModal}
        setOpenCreateDiscountModal={setOpenCreateDiscountModal}
        updatedItem={selectedItem}
        setUpdatedItem={setSelectedItem}
      />
    </>
  )
}

export default Discount