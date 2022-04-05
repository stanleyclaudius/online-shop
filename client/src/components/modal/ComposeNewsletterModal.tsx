import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Editor from '../general/Editor'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  modalRef: React.MutableRefObject<HTMLDivElement>
}

const ComposeNewsletterModal: React.FC<IProps> = ({ openModal, setOpenModal, modalRef }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <div className={`${openModal ? 'opacity-100' : 'opacity-0'} ${openModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={modalRef}
        className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[700px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1>Compose Newsletter</h1>
          <AiOutlineClose
            onClick={() => setOpenModal(false)}
            className='cursor-pointer'
          />
        </div>
        <div className='p-5 max-h-[500px] overflow-auto hide-scrollbar'>
          <form>
            <div>
              <label htmlFor='title' className='text-sm'>Title</label>
              <input type='text' name='title' id='title' autoComplete='off' value={title} onChange={e => setTitle(e.target.value)} className='border mt-3 border-gray-300 rounded-md p-2 outline-0 w-full text-sm' />
            </div>
            <div className='mt-5'>
              <label className='text-sm mb-3 block'>Content</label>
              <Editor
                content={content}
                setContent={setContent}
              />
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 transition-[background] px-4 py-2 rounded-md text-white text-sm mt-7'>Compose</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ComposeNewsletterModal