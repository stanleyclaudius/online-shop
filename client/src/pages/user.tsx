import { useState, useEffect, useRef } from 'react'
import Layout from './../components/admin/Layout'
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
      <Layout>
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
    </>
  )
}

export default User