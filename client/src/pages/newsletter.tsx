import { useState, useEffect, useRef } from 'react'
import Layout from './../components/admin/Layout'
import ComposeNewsletterModal from './../components/modal/ComposeNewsletterModal'

const Newsletter = () => {
  const [openComposeModal, setOpenComposeModal] = useState(false)

  const composeModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openComposeModal && composeModalRef.current && !composeModalRef.current.contains(e.target as Node)) {
        setOpenComposeModal(false)
      }
    }
    
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openComposeModal])

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between gap-10'>
          <h1 className='text-2xl tracking-wide font-oswald'>Newsletter Management</h1>
          <button
            onClick={() => setOpenComposeModal(true)}
            className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white'
          >
            Compose Newsletter
          </button>
        </div>
      </Layout>

      <ComposeNewsletterModal
        openModal={openComposeModal}
        setOpenModal={setOpenComposeModal}
        modalRef={composeModalRef}
      />
    </>
  )
}

export default Newsletter