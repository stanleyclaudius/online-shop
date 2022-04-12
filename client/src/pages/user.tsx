import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/general/Loader'
import UserDetailModal from '../components/modal/UserDetailModal'
import { getAllUser } from '../redux/actions/userActions'
import HeadInfo from '../utils/HeadInfo'
import { IUser, RootStore } from '../utils/Interface'
import Layout from './../components/admin/Layout'
import NotFound from './../components/general/NotFound'

const User = () => {
  const [currPage, setCurrPage] = useState(1)
  const [users, setUsers] = useState<IUser[]>([])
  const [openUserDetailModal, setOpenUserDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IUser>()

  const userDetailModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, alert, user } = useSelector((state: RootStore) => state)

  const handleClickDetail = (item: IUser)  => {
    setSelectedItem(item)
    setOpenUserDetailModal(true)
  }

  const handlePaginationArrow = (type: string) => {
    let newPage = 0

    if (type === 'prev') {
      newPage = currPage - 1
      if (newPage < 1) {
        newPage = 1
      }
    } else if (type === 'next') {
      newPage = currPage + 1
      if (newPage > user.totalPage) {
        newPage = user.totalPage
      }
    }

    setCurrPage(newPage)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openUserDetailModal && userDetailModalRef.current && !userDetailModalRef.current.contains(e.target as Node)) {
        setOpenUserDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openUserDetailModal])

  useEffect(() => {
    dispatch(getAllUser(auth.token!, currPage))
  }, [dispatch, auth.token, currPage])

  useEffect(() => {
    setUsers(user.data)
  }, [user.data])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <HeadInfo title='User Management' />
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
                      <tr key={item._id} className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone ? item.phone : 'Not Set'}</td>
                        <td>{item.address ? item.address : 'Not Set'}</td>
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
                user.totalPage > 1 &&
                <>
                  <div className='flex mt-6 border border-gray-300 rounded-md w-fit float-right'>
                    {
                      currPage > 1 &&
                      <div onClick={() => handlePaginationArrow('prev')} className='cursor-pointer py-2 px-4 border-r border-gray-300'>&lt;</div>
                    }

                    {
                      Array.from(Array(user.totalPage).keys()).map((_, idx) => (
                        <div key={idx} onClick={() => setCurrPage(idx + 1 )} className={`cursor-pointer py-2 px-4 border-r border-gray-300 ${currPage === idx + 1 ? 'bg-[#3552DC] text-white' : undefined}`}>{idx + 1}</div>
                      ))
                    }

                    {
                      currPage < user.totalPage &&
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

      {
        selectedItem &&
        <UserDetailModal
          openUserDetailModal={openUserDetailModal}
          setOpenUserDetailModal={setOpenUserDetailModal}
          userDetailModalRef={userDetailModalRef}
          selectedItem={selectedItem}
        />
      }
    </>
  )
}

export default User