import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from './../../utils/Interface'
import { deleteProduct, getProduct } from './../../redux/actions/productActions'
import { IProductData } from './../../redux/types/productTypes'
import Layout from './../../components/admin/Layout'
import DeleteModal from './../../components/modal/DeleteModal'
import CreateProductModal from './../../components/modal/CreateProductModal'
import Loader from './../../components/general/Loader'

const Product = () => {
  const [products, setProducts] = useState<IProductData[]>([])
  const [openCreateProductModal, setOpenCreateProductModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [updatedItem, setUpdatedItem] = useState<IProductData>({
    _id: '',
    name: '',
    brand: '',
    category: '',
    colors: [],
    sizes: [],
    price: 0,
    discount: 0,
    description: '',
    images: [],
    stock: [],
    weight: 0
  })

  const createProductRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, product, alert } = useSelector((state: RootStore) => state)

  const handleDeleteButtonClicked = (id: string) => {
    setOpenDeleteModal(true)
    setSelectedId(id)
  }

  const handleDeleteProduct = async() => {
    await dispatch(deleteProduct(selectedId, auth.token!))
    setOpenDeleteModal(false)
  }

  const handleUpdateButtonClicked = (item: IProductData) => {
    setOpenCreateProductModal(true)
    setUpdatedItem(item)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openCreateProductModal && createProductRef.current && !createProductRef.current.contains(e.target as Node)) {
        setOpenCreateProductModal(false)
        setUpdatedItem({
          _id: '',
          name: '',
          brand: '',
          category: '',
          colors: [],
          sizes: [],
          price: 0,
          discount: 0,
          description: '',
          images: [],
          stock: [],
          weight: 0
        })
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

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  useEffect(() => {
    setProducts(product.data)
  }, [product])

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between gap-10'>
          <h1 className='text-2xl tracking-wide font-oswald'>Product Management</h1>
          <button
            onClick={() => setOpenCreateProductModal(true)}
            className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white'
          >
            Create Product
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
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((item, idx) => (
                      <tr key={item._id} className='text-sm text-center bg-gray-100'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{(typeof item.brand === 'string') ? item.brand : item.brand.name}</td>
                        <td>{(typeof item.category === 'string') ? item.category : item.category.name}</td>
                        <td>IDR{item.price}</td>
                        <td>{item.discount}%</td>
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

      <CreateProductModal
        createProductRef={createProductRef}
        openCreateProductModal={openCreateProductModal}
        setOpenCreateProductModal={setOpenCreateProductModal}
        updatedItem={updatedItem}
        setUpdatedItem={setUpdatedItem}
      />

      <DeleteModal
        deleteModalRef={deleteModalRef}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        success={handleDeleteProduct}
      />
    </>
  )
}

export default Product