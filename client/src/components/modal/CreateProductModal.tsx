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

  const handleAddColor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setColors([...colors, colorInput])
    setColorInput('')
    setOpenColorInput(false)
  }

  const handleCloseColorInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpenColorInput(false)
  }

  const handleCloseSizeInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpenSizeInput(false)
  }

  const handleAddSize = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSizes([...sizes, sizeInput])
    setSizeInput(0)
    setOpenSizeInput(false)
  }

  const deleteColor = (idx: number) => {
    const colorsCopy = [...colors]
    colorsCopy.splice(idx, 1)
    setColors(colorsCopy)
  }

  const deleteSize = (idx: number) => {
    const sizesCopy = [...sizes]
    sizesCopy.splice(idx, 1)
    setSizes(sizesCopy)
  }

  const deleteImage = (idx: number) => {
    const imagesCopy = [...images]
    imagesCopy.splice(idx, 1)
    setImages(imagesCopy)
  }

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    // @ts-ignore
    const files = [...target.files]
    setImages([...images, ...files])
  }

  return (
    <div className={`${openCreateProductModal ? 'opacity-100' : 'opacity-0'} ${openCreateProductModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div ref={createProductRef} className={`${openCreateProductModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}>
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>Create Product</h1>
          <AiOutlineClose className='cursor-pointer' onClick={() => setOpenCreateProductModal(false)} />
        </div>
        <div className='px-5 py-3 h-[75vh] overflow-auto hide-scrollbar'>
          <form>
            <div>
              <label htmlFor='name' className='text-sm'>Name</label>
              <input type='text' id='name' name='name' autoComplete='off' className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2' />
            </div>
            <div className='mt-4'>
              <label htmlFor='brand' className='text-sm'>Brand</label>
              <select name='brand' id='brand' className='w-full p-2 bg-white outline-0 rounded-md border border-gray-300 text-sm mt-2'>
                <option value=''>- Select Brand -</option>
              </select>
            </div>
            <div className='mt-4'>
              <label htmlFor='category' className='text-sm'>Category</label>
              <select name='category' id='category' className='w-full p-2 bg-white outline-0 rounded-md border border-gray-300 text-sm mt-2'>
                <option value=''>- Select Category -</option>
              </select>
            </div>
            <div className='mt-4'>
              <label htmlFor='color' className='text-sm'>Color</label>
              {
                colors.length > 0 &&
                <div className='mt-3 mb-4 flex items-center gap-4'>
                  {
                    colors.map((color, idx) => (
                      <div className='w-4 h-4 rounded-full outline outline-2 outline-offset-2 relative' style={{ background: color, outlineColor: color }} key={idx}>
                        <div className='absolute -top-2 -right-2 bg-red-500 rounded-full text-white font-bold cursor-pointer text-sm' onClick={() => deleteColor(idx)}><AiOutlineClose /></div>
                      </div>
                    ))
                  }
                </div>
              }
              {
                openColorInput
                ? (
                  <div className='mt-2 flex items-center gap-2'>
                    <input type='text' value={colorInput} onChange={e => setColorInput(e.target.value)} name='color' id='color' className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm' />
                    <button className='bg-blue-500 hover:bg-blue-600 transition-[background] text-sm text-white rounded-md px-5 py-2' onClick={handleAddColor}>Add</button>
                    <button className='bg-red-500 hover:bg-red-600 transition-[background] text-sm text-white rounded-md px-5 py-2' onClick={handleCloseColorInput}>Cancel</button>
                  </div>
                )
                : <p className='text-blue-500 text-sm font-bold mt-2 cursor-pointer' onClick={() => setOpenColorInput(true)}>Add Color</p>
              }
            </div>
            <div className='mt-4'>
              <label htmlFor='size'>Size</label>
              {
                sizes.length > 0 &&
                <div className='mt-2 flex items-center gap-4'>
                  {
                    sizes.map((size, idx) => (
                      <div className='text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300 relative' key={idx}>
                        {size}
                        <div className='absolute -top-2 -right-2 bg-red-500 rounded-full text-white font-bold cursor-pointer text-sm' onClick={() => deleteSize(idx)}><AiOutlineClose /></div>
                      </div>
                    ))
                  }
                </div>
              }
              {
                openSizeInput
                ? (
                  <div className='mt-2 flex items-center gap-2'>
                    <input type='number' value={sizeInput} onChange={e => setSizeInput(parseInt(e.target.value))} name='size' id='size' className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm' />
                    <button className='bg-blue-500 hover:bg-blue-600 transition-[background] text-sm text-white rounded-md px-5 py-2' onClick={handleAddSize}>Add</button>
                    <button className='bg-red-500 hover:bg-red-600 transition-[background] text-sm text-white rounded-md px-5 py-2' onClick={handleCloseSizeInput}>Cancel</button>
                  </div>
                )
                : <p className='text-blue-500 text-sm font-bold mt-2 cursor-pointer' onClick={() => setOpenSizeInput(true)}>Add Size</p>
              }
            </div>
            <div className='mt-4'>
              <label htmlFor='price' className='text-sm'>Price (IDR in K)</label>
              <input type='number' id='price' name='price' autoComplete='off' className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2' />
            </div>
            <div className='mt-4'>
              <label htmlFor='discount' className='text-sm'>Discount (%)</label>
              <input type='number' id='discount' name='discount' autoComplete='off' className='w-full rounded-md border border-gray-300 outline-0 p-2 text-sm mt-2' />
            </div>
            {
              sizes.length > 0 &&
              <div className='mt-4'>
                <label htmlFor='stock'>Stock</label>
                {
                  sizes.map((size, idx) => (
                    <div className='mt-2 flex items-center gap-2' key={idx}>
                      <div className='text-sm px-2 py-1 bg-gray-100 rounded-md border border-gray-300'>{size}</div>
                      <input type='number' className='w-full rounded-md border border-gray-300 outline-0 py-1 px-2 text-sm' />
                    </div>
                  ))
                }
              </div>
            }
            <div className='mt-4'>
              <label htmlFor='description' className='text-sm'>Description</label>
              <textarea name='description' id='description' className='p-2 w-full rounded-md border border-gray-300 outline-0 text-sm mt-2 resize-none' />
            </div>
            <div className='mt-4'>
              <label htmlFor='image' className='text-sm'>Images</label>
              <input type='file' accept='image/*' onChange={handleChangeFile} multiple className='text-sm border border-gray-300 rounded-md w-full p-2 mt-2' />
            </div>
            {
              images.length > 0 &&
              <div className='mt-3 flex items-center gap-4'>
                {
                  images.map((img, idx) => (
                    <div className='w-20 h-20 rounded-md border border-gray-300 flex items-center justify-center p-1 relative' key={idx}>
                      <img src={URL.createObjectURL(img)} alt='jaja' />
                      <div className='absolute -top-2 -right-2 bg-red-500 rounded-full text-white font-bold cursor-pointer text-sm' onClick={() => deleteImage(idx)}><AiOutlineClose /></div>
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