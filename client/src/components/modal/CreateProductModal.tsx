import React, { MouseEvent, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { InputChange } from './../../utils/Interface'

interface IProps {
  createProductRef: React.MutableRefObject<HTMLDivElement>
  openCreateProductModal: boolean
  setOpenCreateProductModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateProductModal: React.FC<IProps> = ({ createProductRef, openCreateProductModal, setOpenCreateProductModal }) => {
  const [sizeInput, setSizeInput] = useState(0)
  const [colorInput, setColorInput] = useState('')

  const [sizes, setSizes] = useState<number[]>([])
  const [colors, setColors] = useState<string[]>([])

  const [openColorInput, setOpenColorInput] = useState(false)
  const [openSizeInput, setOpenSizeInput] = useState(false)
  
  const [images, setImages] = useState<File[]>([])

  const addItem = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault()

    switch (type) {
      case 'color':
        setColors([...colors, colorInput])
        setColorInput('')
        setOpenColorInput(false)
        break
      case 'size':
        setSizes([...sizes, sizeInput])
        setSizeInput(0)
        setOpenSizeInput(false)
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
    // @ts-ignore
    const files = [...target.files]
    setImages([...images, ...files])
  }

  return (
    <div className={`${openCreateProductModal ? 'opacity-100' : 'opacity-0'} ${openCreateProductModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={createProductRef}
        className={`${openCreateProductModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>Create Product</h1>
          <AiOutlineClose
            onClick={() => setOpenCreateProductModal(false)}
            className='cursor-pointer'
          />
        </div>
        <div className='px-5 py-3 h-[75vh] overflow-auto hide-scrollbar'>
          <form>
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
                className='w-full p-2 bg-white outline-0 rounded-md border border-gray-300 text-sm mt-2'
              >
                <option value=''>- Select Brand -</option>
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
                className='w-full p-2 bg-white outline-0 rounded-md border border-gray-300 text-sm mt-2'
              >
                <option value=''>- Select Category -</option>
              </select>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='color'
                className='text-sm'
              >
                Color
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
                Price (IDR in K)
              </label>
              <input
                type='number'
                autoComplete='off'
                id='price'
                name='price'
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
                className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2'
              />
            </div>
            {
              sizes.length > 0 &&
              <div className='mt-4'>
                <label htmlFor='stock'>Stock</label>
                {
                  sizes.map((size, idx) => (
                    <div className='mt-2 flex items-center gap-2' key={idx}>
                      <div className='text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300'>{size}</div>
                      <input
                        type='number'
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
                className='p-2 w-full rounded-md border border-gray-300 outline-0 text-sm mt-2 resize-none'
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
                      <img src={URL.createObjectURL(img)} alt='jaja' />
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
            <button className='text-sm bg-blue-500 hover:bg-blue-600 transition-[background] rounded-md float-right text-white px-5 py-2 my-5'>Save</button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductModal