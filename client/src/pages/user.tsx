import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'
import DeleteModal from './../components/modal/DeleteModal'

const User = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

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
            <h1 className='text-2xl tracking-wide font-oswald'>User Management</h1>
            <div className='overflow-x-auto mt-8'>
              <table className='w-full'>
                <thead>
                  <tr className='text-sm bg-[#3552DC] text-white'>
                    <th className='p-3'>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Province</th>
                    <th>City</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-sm text-center bg-gray-100'>
                    <td className='p-3'>1</td>
                    <td>Lorem Ipsum</td>
                    <td>lorem@gmail.com</td>
                    <td>0812 9282 2222</td>
                    <td>North Lorem</td>
                    <td>Lorem</td>
                    <td>Lorem</td>
                    <td>
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
    </>
  )
}

export default User