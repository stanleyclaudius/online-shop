import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface IProps {
  deleteModalRef: React.MutableRefObject<HTMLDivElement>
  openDeleteModal: boolean
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  success?: () => void
}

const DeleteModal: React.FC<IProps> = ({ deleteModalRef, openDeleteModal, setOpenDeleteModal, success }) => {
  return (
    <div className={`${openDeleteModal ? 'opacity-100' : 'opacity-0'} ${openDeleteModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={deleteModalRef}
        className={`${openDeleteModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[400px] bg-white rounded-md flex items-center flex-col p-7 gap-5`}
      >
        <div className='border border-red-500 rounded-full w-fit border-4 p-3'>
          <AiOutlineClose className='text-red-500 text-5xl' />
        </div>
        <h1>Are you sure want to delete?</h1>
        <div className='flex items-center gap-7'>
          <button
            onClick={success}
            className='rounded-md px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-[background] text-sm'
          >
            Delete
          </button>
          <button
            onClick={() => setOpenDeleteModal(false)}
            className='rounded-md px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-[background] text-sm'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal