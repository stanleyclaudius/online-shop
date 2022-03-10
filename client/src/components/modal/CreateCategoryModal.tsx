import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, RootStore } from './../../utils/Interface'
import { ALERT } from './../../redux/types/alertTypes'
import { createCategory, updateCategory } from './../../redux/actions/categoryActions'
import { ICategoryData } from './../../redux/types/categoryTypes'
import Loader from './../general/Loader'

interface IProps {
  createCategoryRef: React.MutableRefObject<HTMLDivElement>
  openCreateCategoryModal: boolean
  setOpenCreateCategoryModal: React.Dispatch<React.SetStateAction<boolean>>,
  updatedItem: ICategoryData
  setUpdatedItem: React.Dispatch<React.SetStateAction<ICategoryData>>
}

const CreateProductModal: React.FC<IProps> = ({
  createCategoryRef,
  openCreateCategoryModal,
  setOpenCreateCategoryModal,
  updatedItem,
  setUpdatedItem
}) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleCloseModal = () => {
    setOpenCreateCategoryModal(false)
    setUpdatedItem({ _id: '', name: '' })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!name) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide category name.'
        }
      })
    }

    setLoading(true)
    if (isUpdated) {
      await dispatch(updateCategory({ ...updatedItem, name }, auth.token!))
      setUpdatedItem({ _id: '', name: '' })
      setIsUpdated(false)
    } else {
      await dispatch(createCategory({ name }, auth.token!))
    }
    setLoading(false)

    setOpenCreateCategoryModal(false)
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
    <div className={`${openCreateCategoryModal ? 'opacity-100' : 'opacity-0'} ${openCreateCategoryModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={createCategoryRef}
        className={`${openCreateCategoryModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-5 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>{isUpdated ? 'Update' : 'Create'} Category</h1>
          <AiOutlineClose
            onClick={handleCloseModal}
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
                id='name'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full border border-gray-300 p-2 outline-0 mt-2 rounded-md text-sm'
              />
            </div>
            <button className={`text-sm ${loading ? 'bg-blue-300' : 'bg-blue-500'} ${loading ? 'hover:bg-blue-300' : 'hover:bg-blue-600'} ${loading ? 'cursor-auto' : 'cursor-pointer'} transition-[background] rounded-md float-right text-white px-5 py-2 my-5`}>
              {loading ? <Loader /> : isUpdated ? 'Save Changes' : 'Save'}
            </button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductModal