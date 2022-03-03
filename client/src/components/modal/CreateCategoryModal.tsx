import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit } from './../../utils/Interface'

interface IProps {
  createCategoryRef: React.MutableRefObject<HTMLDivElement>
  openCreateCategoryModal: boolean
  setOpenCreateCategoryModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateProductModal: React.FC<IProps> = ({ createCategoryRef, openCreateCategoryModal, setOpenCreateCategoryModal }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  return (
    <div className={`${openCreateCategoryModal ? 'opacity-100' : 'opacity-0'} ${openCreateCategoryModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div ref={createCategoryRef} className={`${openCreateCategoryModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}>
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>Create Category</h1>
          <AiOutlineClose className='cursor-pointer' onClick={() => setOpenCreateCategoryModal(false)} />
        </div>
        <div className='px-5 py-3 overflow-auto hide-scrollbar'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name' className='text-sm'>Name</label>
              <input type='text' name='name' id='name' value={name} onChange={e => setName(e.target.value)} className='w-full border border-gray-300 p-2 outline-0 mt-2 rounded-md text-sm' />
            </div>
            <button className='text-sm bg-blue-500 hover:bg-blue-600 transition-[background] rounded-md float-right text-white px-5 py-2 my-5'>Save</button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductModal