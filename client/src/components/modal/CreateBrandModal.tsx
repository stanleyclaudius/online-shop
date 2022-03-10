import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, RootStore } from './../../utils/Interface'
import { createBrand, updateBrand } from './../../redux/actions/brandActions'
import { IBrandData } from './../../redux/types/brandTypes'
import { ALERT } from './../../redux/types/alertTypes'
import Loader from './../general/Loader'

interface IProps {
  createBrandRef: React.MutableRefObject<HTMLDivElement>
  openCreateBrandModal: boolean
  setOpenCreateBrandModal: React.Dispatch<React.SetStateAction<boolean>>
  updatedItem: IBrandData
  setUpdatedItem: React.Dispatch<React.SetStateAction<IBrandData>>
}

const CreateBrandModal: React.FC<IProps> = ({
  createBrandRef,
  openCreateBrandModal,
  setOpenCreateBrandModal,
  updatedItem,
  setUpdatedItem
}) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleCloseButton = () => {
    setOpenCreateBrandModal(false)
    setUpdatedItem({ _id: '', name: '' })
  }

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault()

    if (!name) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide brand name.'
        }
      })
    }

    setLoading(true)
    if (isUpdated) {
      await dispatch(updateBrand({...updatedItem, name}, auth.token!))
      setIsUpdated(false)
      setUpdatedItem({ _id: '', name: '' })
    } else {
      await dispatch(createBrand({ name }, auth.token!))
    }
    setLoading(false)
    setOpenCreateBrandModal(false)
    setName('')
  }

  useEffect(() => {
    if (updatedItem._id) {
      setIsUpdated(true)
      setName(updatedItem.name)
    }

    return () => {
      setIsUpdated(false)
      setName('')
    }
  }, [updatedItem])

  return (
    <div className={`${openCreateBrandModal ? 'opacity-100' : 'opacity-0'} ${openCreateBrandModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={createBrandRef}
        className={`${openCreateBrandModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>{isUpdated ? 'Update' : 'Create'} Brand</h1>
          <AiOutlineClose
            onClick={handleCloseButton}
            className='cursor-pointer'
          />
        </div>
        <div className='px-5 py-3 overflow-auto hide-scrollbar'>
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
                name='name'
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full border border-gray-300 p-2 outline-0 mt-2 rounded-md text-sm'
              />
            </div>
            <button className={`text-sm ${loading ? 'bg-blue-300' : 'bg-blue-500'} ${loading ? 'bg-blue-300' : 'hover:bg-blue-600'} ${loading ? 'cursor-auto' : 'cursor-pointer'} transition-[background] rounded-md float-right text-white px-5 py-2 my-5`}>
              {loading ? <Loader /> : isUpdated ? 'Save Changes' : 'Save'}
            </button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBrandModal