import { MouseEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, InputChange, RootStore } from './../../utils/Interface'
import { getBrand } from './../../redux/actions/brandActions'
import { getCategory } from './../../redux/actions/categoryActions'
import { createProduct, updateProduct } from './../../redux/actions/productActions'
import { IProductData } from './../../redux/types/productTypes'
import { ALERT } from './../../redux/types/alertTypes'
import Loader from './../general/Loader'

interface IProps {
  createProductRef: React.MutableRefObject<HTMLDivElement>
  openCreateProductModal: boolean
  setOpenCreateProductModal: React.Dispatch<React.SetStateAction<boolean>>
  updatedItem: IProductData
  setUpdatedItem: React.Dispatch<React.SetStateAction<IProductData>>
}

type stock = {
  size: number
  stock: number
}

const CreateProductModal: React.FC<IProps> = ({
  createProductRef,
  openCreateProductModal,
  setOpenCreateProductModal,
  updatedItem,
  setUpdatedItem
}) => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    price: 0,
    discount: 0,
    description: '',
    weight: 0
  })
  const [sizeInput, setSizeInput] = useState(0)
  const [colorInput, setColorInput] = useState('')
  const [stock, setStock] = useState<stock[]>([])
  const [loading, setLoading] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const [sizes, setSizes] = useState<number[]>([])
  const [colors, setColors] = useState<string[]>([])

  const [openColorInput, setOpenColorInput] = useState(false)
  const [openSizeInput, setOpenSizeInput] = useState(false)
  
  const [images, setImages] = useState<any[]>([])

  const dispatch = useDispatch()
  const { auth, brand, category } = useSelector((state: RootStore) => state)

  const addItem = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault()

    switch (type) {
      case 'color':
        if (!colorInput) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: 'Please provide product color.'
            }
          })
        }

        if (colors.includes(colorInput)) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: `${colorInput} color has been added before.`
            }
          })
        }

        setColors([...colors, colorInput])
        setColorInput('')
        setOpenColorInput(false)
        break
      case 'size':
        if (!sizeInput) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: 'Please provide product size.'
            }
          })
        }

        if (sizes.includes(sizeInput)) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: `Size ${sizeInput} has been added before.`
            }
          })
        }

        setSizes([...sizes, sizeInput])
        setSizeInput(0)
        setOpenSizeInput(false)
        setStock([...stock, { size: sizeInput, stock: 0 }])
        break
      default:
        break
    }
  }

  const closeInput = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault()

    switch (type) {
      case 'color':
        setOpenColorInput(false)
        break
      case 'size':
        setOpenSizeInput(false)
        break
      default:
        break
    }
  }

  const deleteItem = (idx: number, type: string) => {
    switch (type) {
      case 'color':
        const colorsCopy = [...colors]
        colorsCopy.splice(idx, 1)
        setColors(colorsCopy)
        break
      case 'size':
        const sizesCopy = [...sizes]
        sizesCopy.splice(idx, 1)
        setSizes(sizesCopy)

        const stockCopy = [...stock]
        stockCopy.splice(idx, 1)
        setStock(stockCopy)
        break
      case 'image':
        const imagesCopy = [...images]
        imagesCopy.splice(idx, 1)
        setImages(imagesCopy)
        break
      default:
        break
    }
  }

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = [...Object.values(target.files!)]
    setImages([...images, ...files])
  }

  const handleGeneralChange = (e: InputChange) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  const handleChangeStock = (e: InputChange, idx: number) => {
    const value = e.target.value
    const getStock = stock[idx]
    getStock.stock = parseInt(value)
    setStock(
      stock.map((item, i) => i === idx ? getStock : item)
    )
  }

  const handleCloseModal = () => {
    setOpenCreateProductModal(false)
    setIsUpdated(false)
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

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (
      !productData.name ||
      !productData.brand ||
      !productData.category ||
      !productData.price ||
      !productData.description
    ) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please fill all needed data to create product.'
        }
      })
    }

    if (productData.weight < 100) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Product weight can\'t be less than 100 gram.'
        }
      })
    }

    if (sizes.length < 1 || colors.length < 1 || images.length < 1) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please fill all needed data to create product.'
        }
      })
    }

    if (productData.price < 10000) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Product price can\'t be lower than IDR10.000'
        }
      })
    }

    if (productData.discount !== 0) {
      if (productData.discount < 1 || productData.discount > 100) {
        return dispatch({
          type: ALERT,
          payload: {
            errors: 'Discount should be in range of 1 and 100'
          }
        })
      }
    }

    for (const item of stock) {
      if (item.stock <= 0) {
        return dispatch({
          type: ALERT,
          payload: {
            errors: 'Product stock can\'t be 0.'
          }
        })
      }
    }
    
    setLoading(true)
    if (isUpdated) {
      await dispatch(updateProduct({ ...productData, _id: updatedItem._id, sizes, colors, images, stock }, auth.token!))
      setIsUpdated(false)
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
    } else {
      await dispatch(createProduct({ ...productData, sizes, colors, images, stock }, auth.token!))
    }
    setLoading(false)
    setOpenCreateProductModal(false)

    setProductData({
      name: '',
      brand: '',
      category: '',
      price: 0,
      discount: 0,
      description: '',
      weight: 0
    })
    setSizes([])
    setColors([])
    setStock([])
    setImages([])
  }

  useEffect(() => {
    dispatch(getBrand())
    dispatch(getCategory())
  }, [dispatch, category.totalPage])

  useEffect(() => {
    if (updatedItem._id) {
      setIsUpdated(true)
      setProductData({
        name: updatedItem.name,
        brand: (typeof updatedItem.brand === 'string') ? updatedItem.brand : updatedItem.brand._id,
        category: (typeof updatedItem.category === 'string') ? updatedItem.category : updatedItem.category._id,
        price: updatedItem.price,
        discount: updatedItem.discount,
        description: updatedItem.description,
        weight: updatedItem.weight
      })
      setColors(updatedItem.colors)
      setSizes(updatedItem.sizes)
      setStock(updatedItem.stock)
      setImages(updatedItem.images)
    }

    return () => {
      setIsUpdated(false)
      setProductData({
        name: '',
        brand: '',
        category: '',
        price: 0,
        discount: 0,
        description: '',
        weight: 0
      })
      setColors([])
      setSizes([])
      setStock([])
      setImages([])
    }
  }, [updatedItem])

  return (
    <div className={`${openCreateProductModal ? 'opacity-100' : 'opacity-0'} ${openCreateProductModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={createProductRef}
        className={`${openCreateProductModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>{isUpdated ? 'Update' : 'Create'} Product</h1>
          <AiOutlineClose
            onClick={handleCloseModal}
            className='cursor-pointer'
          />
        </div>
        <div className='px-5 py-3 h-[75vh] overflow-auto hide-scrollbar'>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='name'
                className='text-sm'
              >
                Name
              </label>
              <input
                type='text'
                autoComplete='off'
                id='name'
                name='name'
                value={productData.name}
                onChange={handleGeneralChange}
                className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='brand'
                className='text-sm'
              >
                Brand
              </label>
              <select
                id='brand'
                name='brand'
                value={productData.brand}
                onChange={handleGeneralChange}
                className='w-full p-2 bg-white outline-0 rounded-md border border-gray-300 text-sm mt-2'
              >
                <option value=''>- Select Brand -</option>
                {
                  brand.data.map(item => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='category'
                className='text-sm'
              >
                Category
              </label>
              <select
                id='category'
                name='category'
                value={productData.category}
                onChange={handleGeneralChange}
                className='w-full p-2 bg-white outline-0 rounded-md border border-gray-300 text-sm mt-2'
              >
                <option value=''>- Select Category -</option>
                {
                  category.data.map(item => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='color'
                className='text-sm'
              >
                Color <span className='text-xs text-gray-500 ml-2'>(Hexadecimal Format (Start with #))</span>
              </label>
              {
                colors.length > 0 &&
                <div className='mt-3 mb-4 flex items-center gap-4'>
                  {
                    colors.map((color, idx) => (
                      <div
                        key={idx}
                        className='w-4 h-4 rounded-full outline outline-2 outline-offset-2 relative'
                        style={{ background: color, outlineColor: color }}
                      >
                        <div
                          onClick={() => deleteItem(idx, 'color')}
                          className='absolute -top-2 -right-2 bg-red-500 rounded-full text-white font-bold cursor-pointer text-sm'
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                    ))
                  }
                </div>
              }
              {
                openColorInput
                ? (
                  <div className='mt-2 flex items-center gap-2'>
                    <input
                      type='text'
                      autoComplete='off'
                      id='color'
                      name='color'
                      value={colorInput}
                      onChange={e => setColorInput(e.target.value)}
                      className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm'
                    />
                    <button
                      onClick={e => addItem(e, 'color')}
                      className='bg-blue-500 hover:bg-blue-600 transition-[background] text-sm text-white rounded-md px-5 py-2'
                    >
                      Add
                    </button>
                    <button
                      onClick={e => closeInput(e, 'color')}
                      className='bg-red-500 hover:bg-red-600 transition-[background] text-sm text-white rounded-md px-5 py-2'
                    >
                      Cancel
                    </button>
                  </div>
                )
                : (
                  <p
                    onClick={() => setOpenColorInput(true)}
                    className='text-blue-500 text-sm font-bold mt-2 cursor-pointer'
                  >
                    Add Color
                  </p>
                )
              }
            </div>
            <div className='mt-4'>
              <label htmlFor='size'>Size</label>
              {
                sizes.length > 0 &&
                <div className='mt-2 flex items-center gap-4'>
                  {
                    sizes.map((size, idx) => (
                      <div
                        key={idx}
                        className='text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300 relative'
                      >
                        {size}
                        <div
                          onClick={() => deleteItem(idx, 'size')}
                          className='absolute -top-2 -right-2 bg-red-500 rounded-full text-white font-bold cursor-pointer text-sm'
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                    ))
                  }
                </div>
              }
              {
                openSizeInput
                ? (
                  <div className='mt-2 flex items-center gap-2'>
                    <input
                      type='number'
                      autoComplete='off'
                      id='size'
                      name='size'
                      value={sizeInput}
                      onChange={e => setSizeInput(parseInt(e.target.value))}
                      className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm'
                    />
                    <button
                      onClick={e => addItem(e, 'size')}
                      className='bg-blue-500 hover:bg-blue-600 transition-[background] text-sm text-white rounded-md px-5 py-2'
                    >
                      Add
                    </button>
                    <button
                      onClick={e => closeInput(e, 'size')}
                      className='bg-red-500 hover:bg-red-600 transition-[background] text-sm text-white rounded-md px-5 py-2'
                    >
                      Cancel
                    </button>
                  </div>
                )
                : (
                  <p
                    onClick={() => setOpenSizeInput(true)}
                    className='text-blue-500 text-sm font-bold mt-2 cursor-pointer'
                  >
                    Add Size
                  </p>
                )
              }
            </div>
            <div className='mt-4'>
              <label
                htmlFor='price'
                className='text-sm'
              >
                Price (in IDR)
              </label>
              <input
                type='number'
                autoComplete='off'
                id='price'
                name='price'
                min={0}
                value={productData.price}
                onChange={handleGeneralChange}
                className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='discount'
                className='text-sm'
              >
                Discount (%)
              </label>
              <input
                type='number'
                autoComplete='off'
                id='discount'
                name='discount'
                value={productData.discount}
                min={0}
                max={100}
                onChange={handleGeneralChange}
                className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2'
              />
            </div>
            {
              sizes.length > 0 &&
              <div className='mt-4'>
                <label htmlFor='stock'>Stock</label>
                {
                  stock.map((item, idx) => (
                    <div className='mt-2 flex items-center gap-2' key={idx}>
                      <div className='text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300'>{item.size}</div>
                      <input
                        type='number'
                        value={item.stock}
                        onChange={(e) => handleChangeStock(e, idx)}
                        className='w-full rounded-md border border-gray-300 outline-0 py-1 px-2 text-sm'
                      />
                    </div>
                  ))
                }
              </div>
            }
            <div className='mt-4'>
              <label
                htmlFor='description'
                className='text-sm'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                value={productData.description}
                onChange={handleGeneralChange}
                className='p-2 w-full rounded-md border border-gray-300 outline-0 text-sm mt-2 resize-none'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='weight'
                className='text-sm'
              >
                Weight
              </label>
              <input
                type='number'
                autoComplete='off'
                id='weight'
                name='weight'
                min={0}
                value={productData.weight}
                onChange={handleGeneralChange}
                className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='image'
                className='text-sm'
              >
                Images
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                multiple
                onChange={handleChangeFile}
                className='text-sm border border-gray-300 rounded-md w-full p-2 mt-2'
              />
            </div>
            {
              images.length > 0 &&
              <div className='mt-3 flex items-center gap-4'>
                {
                  images.map((img, idx) => (
                    <div
                      key={idx}
                      className='w-20 h-20 rounded-md border border-gray-300 flex items-center justify-center p-1 relative'
                    >
                      <img src={img.toString().match(/image/i) ? img : URL.createObjectURL(img)} alt='Sneakershub' />
                      <div
                        onClick={() => deleteItem(idx, 'image')}
                        className='absolute -top-2 -right-2 bg-red-500 rounded-full text-white font-bold cursor-pointer text-sm'
                      >
                        <AiOutlineClose />
                      </div>
                    </div>
                  ))
                }
              </div>
            }
            <button
              disabled={loading ? true : false}
              className={`text-sm ${loading ? 'bg-blue-300' : 'bg-blue-500'} ${loading ? 'bg-blue-300' : 'hover:bg-blue-600'} ${loading ? 'cursor-auto' : 'cursor-pointer'} transition-[background] rounded-md float-right text-white px-5 py-2 my-5`}
            >
              {loading ? <Loader /> : 'Save'}
            </button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductModal