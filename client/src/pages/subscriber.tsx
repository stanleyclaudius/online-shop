import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSubscriber, getSubscriber } from './../redux/actions/subscriberActions'
import Layout from './../components/admin/Layout'
import Loader from './../components/general/Loader'
import { ISubscriberData } from '../redux/types/subscriberTypes'
import { RootStore } from '../utils/Interface'
import DeleteModal from '../components/modal/DeleteModal'
import NotFound from '../components/general/NotFound'
import HeadInfo from '../utils/HeadInfo'

const Subscriber = () => {
  const [currPage, setCurrPage] = useState(1)
  const [subscribers, setSubscribers] = useState<ISubscriberData[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, alert, subscriber } = useSelector((state: RootStore) => state)

  const handlePaginationArrow = (type: string) => {
    let newPage = 0

    if (type === 'prev') {
      newPage = currPage - 1
      if (newPage < 1) {
        newPage = 1
      }
    } else if (type === 'next') {
      newPage = currPage + 1
      if (newPage > subscriber.totalPage) {
        newPage = subscriber.totalPage
      }
    }

    setCurrPage(newPage)
  }

  const handleDeleteSubscriber = async() => {
    await dispatch(deleteSubscriber(selectedId, auth.token!))
    setOpenDeleteModal(false)
  }

  const handleClickDelete = (id: string) => {
    setSelectedId(id)
    setOpenDeleteModal(true)
  }

  useEffect(() => {
    dispatch(getSubscriber(auth.token!, currPage))
  }, [dispatch, auth.token, currPage])

  useEffect(() => {
    setSubscribers(subscriber.data)
  }, [subscriber])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <HeadInfo title='Subscriber Management' />
      <Layout>
        <>
          <h1 className='text-2xl tracking-wide font-oswald'>Subscriber Management</h1>
          {
            alert.loading
            ? <Loader size='xl' />
            : (
              <div className='overflow-x-auto mt-8'>
                <table className='w-full'>
                  <thead>
                    <tr className='text-sm bg-[#3552DC] text-white'>
                      <th className='p-3'>No</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      subscribers.map((item, idx) => (
                        <tr key={item._id} className='text-sm text-center bg-gray-100'>
                          <td className='p-3'>{idx + 1}</td>
                          <td>{item.email}</td>
                          <td>
                            <button
                              onClick={() => handleClickDelete(item._id!)}
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

                {
                  subscriber.totalPage > 1 &&
                  <>
                    <div className='flex mt-6 border border-gray-300 rounded-md w-fit float-right'>
                      {
                        currPage > 1 &&
                        <div onClick={() => handlePaginationArrow('prev')} className='cursor-pointer py-2 px-4 border-r border-gray-300'>&lt;</div>
                      }

                      {
                        Array.from(Array(subscriber.totalPage).keys()).map((_, idx) => (
                          <div key={idx} onClick={() => setCurrPage(idx + 1 )} className={`cursor-pointer py-2 px-4 border-r border-gray-300 ${currPage === idx + 1 ? 'bg-[#3552DC] text-white' : undefined}`}>{idx + 1}</div>
                        ))
                      }

                      {
                        currPage < subscriber.totalPage &&
                        <div onClick={() => handlePaginationArrow('next')} className='cursor-pointer py-2 px-4'>&gt;</div>
                      }
                    </div>
                    <div className='clear-both' />
                  </>
                }
              </div>
            )
          }
        </>
      </Layout>

      <DeleteModal
        deleteModalRef={deleteModalRef}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        success={handleDeleteSubscriber}
      />
    </>
  )
}

export default Subscriber