import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/general/Loader'
import { getAllUser } from '../redux/actions/userActions'
import { IUser, RootStore } from '../utils/Interface'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'

const User = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, alert, user } = useSelector((state: RootStore) => state)

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
    dispatch(getAllUser(auth.token!))
  }, [dispatch, auth.token])

  useEffect(() => {
    setUsers(user.data)
  }, [user.data])

  return (
    <>
      <Layout>
        <h1 className='text-2xl tracking-wide font-oswald'>User Management</h1>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <div className='overflow-x-auto mt-8'>
              <table className='w-full'>
                <thead>
                  <tr className='text-sm bg-[#3552DC] text-white'>
                    <th className='p-3'>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((item, idx) => (
                      <tr className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone ? item.phone : 'Not Set'}</td>
                        <td>{item.address ? item.address : 'Not Set'}</td>
                        <td>
                          <button
                            onClick={() => setOpenDeleteModal(true)}
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
      />
    </>
  )
}

export default User