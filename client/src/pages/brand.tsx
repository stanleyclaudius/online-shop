import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from './../utils/Interface'
import { deleteBrand, getAdminBrand } from '../redux/actions/brandActions'
import { IBrandData } from '../redux/types/brandTypes'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'
import CreateBrandModal from './../components/modal/CreateBrandModal'
import Loader from './../components/general/Loader'
import NotFound from './../components/general/NotFound'

const Brand = () => {
  const [brands, setBrands] = useState<IBrandData[]>([])
  const [openCreateBrandModal, setOpenCreateBrandModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [updatedItem, setUpdatedItem] = useState<IBrandData>({ _id: '', name: '' })
  const [currPage, setCurrPage] = useState(1)

  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const createBrandRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, brand, alert } = useSelector((state: RootStore) => state)

  const handleUpdateButtonClicked = (item: IBrandData) => {
    setOpenCreateBrandModal(true)
    setUpdatedItem(item)
  }

  const handleDeleteButtonClicked = (id: string) => {
    setOpenDeleteModal(true)
    setSelectedId(id)
  }

  const handleDeleteBrand = async() => {
    await dispatch(deleteBrand(selectedId, auth.token!))
    setOpenDeleteModal(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCreateBrandModal && createBrandRef.current && !createBrandRef.current.contains(e.target as Node)) {
        setOpenCreateBrandModal(false)
        setUpdatedItem({ _id: '', name: ''})
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCreateBrandModal])

  const handlePaginationArrow = (type: string) => {
    let newPage = 0

    if (type === 'prev') {
      newPage = currPage - 1
      if (newPage < 1) {
        newPage = 1
      }
    } else if (type === 'next') {
      newPage = currPage + 1
      if (newPage > brand.totalPage) {
        newPage = brand.totalPage
      }
    }

    setCurrPage(newPage)
  }

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
    dispatch(getAdminBrand(auth.token!, currPage))
  }, [dispatch, auth.token, currPage])

  useEffect(() => {
    setBrands(brand.data)
  }, [brand.data])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between gap-10'>
          <h1 className='text-2xl tracking-wide font-oswald'>Brand Management</h1>
          <button
            onClick={() => setOpenCreateBrandModal(true)}
            className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white'
          >
            Create Brand
          </button>
        </div>
        {
          alert.loading
          ? (
            <Loader size='xl' />
          )
          : (
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
                  {
                    brands.map((item, idx) => (
                      <tr key={item._id} className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item.name}</td>
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

              {
                brand.totalPage > 1 &&
                <>
                  <div className='flex mt-6 border border-gray-300 rounded-md w-fit float-right'>
                    {
                      currPage > 1 &&
                      <div onClick={() => handlePaginationArrow('prev')} className='cursor-pointer py-2 px-4 border-r border-gray-300'>&lt;</div>
                    }

                    {
                      Array.from(Array(brand.totalPage).keys()).map((_, idx) => (
                        <div onClick={() => setCurrPage(idx + 1 )} className={`cursor-pointer py-2 px-4 border-r border-gray-300 ${currPage === idx + 1 ? 'bg-[#3552DC] text-white' : undefined}`}>{idx + 1}</div>
                      ))
                    }

                    {
                      currPage < brand.totalPage &&
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

      <DeleteModal
        deleteModalRef={deleteModalRef}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        success={handleDeleteBrand}
      />

      <CreateBrandModal
        createBrandRef={createBrandRef}
        openCreateBrandModal={openCreateBrandModal}
        setOpenCreateBrandModal={setOpenCreateBrandModal}
        updatedItem={updatedItem}
        setUpdatedItem={setUpdatedItem}
      />
    </>
  )
}

export default Brand