import { useState, useEffect, useRef } from 'react'
import CreateProductModal from './../../components/modal/CreateProductModal'
import DeleteModal from './../../components/modal/DeleteModal'
import Navbar from './../../components/admin/Navbar'
import Sidebar from './../../components/admin/Sidebar'

const Product = () => {
  const [openCreateProductModal, setOpenCreateProductModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const createProductRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCreateProductModal && createProductRef.current && !createProductRef.current.contains(e.target as Node)) {
        setOpenCreateProductModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCreateProductModal])

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
              <h1 className='text-2xl tracking-wide font-oswald'>Product List</h1>
              <button className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white' onClick={() => setOpenCreateProductModal(true)}>Create Product</button>
            </div>
            <div className='overflow-x-auto mt-8'>
              <table className='w-full'>
                <thead>
                  <tr className='text-sm bg-[#3552DC] text-white'>
                    <th className='p-3'>No</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-sm text-center bg-gray-100'>
                    <td className='p-3'>1</td>
                    <td>Nike Air Jordan</td>
                    <td>Nike</td>
                    <td>Lifestyle</td>
                    <td>IDR 1,250K</td>
                    <td>15%</td>
                    <td>200</td>
                    <td>
                      <button className='bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition-[background] mr-3'>
                        Update
                      </button>
                      <button className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-[background]' onClick={() => setOpenDeleteModal(true)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr className='text-sm text-center bg-gray-100'>
                    <td className='p-3'>1</td>
                    <td>Nike Air Jordan</td>
                    <td>Nike</td>
                    <td>Lifestyle</td>
                    <td>IDR 1,250K</td>
                    <td>15%</td>
                    <td>200</td>
                    <td>
                      <button className='bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition-[background] mr-3'>
                        Update
                      </button>
                      <button className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-[background]' onClick={() => setOpenDeleteModal(true)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr className='text-sm text-center bg-gray-100'>
                    <td className='p-3'>1</td>
                    <td>Nike Air Jordan</td>
                    <td>Nike</td>
                    <td>Lifestyle</td>
                    <td>IDR 1,250K</td>
                    <td>15%</td>
                    <td>200</td>
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

      <CreateProductModal createProductRef={createProductRef} openCreateProductModal={openCreateProductModal} setOpenCreateProductModal={setOpenCreateProductModal} />
      <DeleteModal deleteModalRef={deleteModalRef} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
    </>
  )
}

export default Product