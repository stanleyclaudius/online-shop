import { useState, useEffect, useRef } from 'react'
import Navbar from './../components/admin/Navbar'
import Sidebar from './../components/admin/Sidebar'
import DeleteModal from './../components/modal/DeleteModal'
import CreateCategoryModal from './../components/modal/CreateCategoryModal'

const Category = () => {
  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const createCategoryRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCreateCategoryModal && createCategoryRef.current && !createCategoryRef.current.contains(e.target as Node)) {
        setOpenCreateCategoryModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCreateCategoryModal])

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
      <div className='flex h-screen'>
        <Sidebar />
        <div className='px-10 py-5 w-full'>
          <Navbar />
          <div className='font-opensans mt-9'>
            <div className='flex items-center justify-between gap-10'>
              <h1 className='text-2xl tracking-wide font-oswald'>Category Management</h1>
              <button className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white' onClick={() => setOpenCreateCategoryModal(true)}>Create Category</button>
            </div>
            <div className='overflow-x-auto mt-8'>
              <table className='w-full'>
                <thead>
                  <tr className='text-sm bg-[#3552DC] text-white'>
                    <th className='p-3'>No</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-sm text-center bg-gray-100'>
                    <td className='p-3'>1</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <button className='bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition-[background] mr-3'>
                        Update
                      </button>
                      <button className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-[background]' onClick={() => setOpenDeleteModal(true)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal deleteModalRef={deleteModalRef} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
      <CreateCategoryModal createCategoryRef={createCategoryRef} openCreateCategoryModal={openCreateCategoryModal} setOpenCreateCategoryModal={setOpenCreateCategoryModal} />
    </>
  )
}

export default Category