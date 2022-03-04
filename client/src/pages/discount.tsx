import { useState, useEffect, useRef } from 'react'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'
import CreateDiscountModal from './../components/modal/CreateDiscountModal'

const Discount = () => {
  const [openCreateDiscountModal, setOpenCreateDiscountModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const createDiscountRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCreateDiscountModal && createDiscountRef.current && !createDiscountRef.current.contains(e.target as Node)) {
        setOpenCreateDiscountModal(false)
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
              <tr className='text-sm text-center bg-gray-100'>
                <td className='p-3'>1</td>
                <td>Lorem Ipsum</td>
                <td>15%</td>
                <td>
                  <button
                    className='bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition-[background] mr-3'
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setOpenDeleteModal(true)}
                    className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-[background]'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>

      <DeleteModal
        deleteModalRef={deleteModalRef}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <CreateDiscountModal
        createDiscountRef={createDiscountRef}
        openCreateDiscountModal={openCreateDiscountModal}
        setOpenCreateDiscountModal={setOpenCreateDiscountModal}
      />
    </>
  )
}

export default Discount