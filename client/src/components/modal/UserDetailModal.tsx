import { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IUser } from '../../utils/Interface'

interface IProps {
  openUserDetailModal: boolean
  setOpenUserDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  userDetailModalRef: React.MutableRefObject<HTMLDivElement>
  selectedItem: IUser
}

const UserDetailModal: React.FC<IProps> = ({ openUserDetailModal, setOpenUserDetailModal, userDetailModalRef, selectedItem }) => {
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')

  useEffect(() => {
    if (selectedItem.province) {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${selectedItem.province}`)
        .then(res => res.json())
        .then(res => setProvince(res.nama))
    }

    return () => setProvince('')
  }, [selectedItem.province])

  useEffect(() => {
    if (selectedItem.city) {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota/${selectedItem.city}`)
        .then(res => res.json())
        .then(res => setCity(res.nama))
    }

    return () => setCity('')
  }, [selectedItem.city])

  useEffect(() => {
    if (selectedItem.district) {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan/${selectedItem.district}`)
        .then(res => res.json())
        .then(res => setDistrict(res.nama))
    }

    return () => setDistrict('')
  }, [selectedItem.district])

  return (
    <div className={`${openUserDetailModal ? 'opacity-100' : 'opacity-0'} ${openUserDetailModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5 font-opensans`}>
      <div
        ref={userDetailModalRef}
        className={`${openUserDetailModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-8 py-3 border-b boder-gray-300'>
          <h1 className='text-lg'>User Detail</h1>
          <AiOutlineClose
            onClick={() => setOpenUserDetailModal(false)}
            className='cursor-pointer'
          />
        </div>
        <div className='px-8 py-5 h-[450px] overflow-auto hide-scrollbar'>
          <div className='flex items-center gap-8'>
            <div className='w-20 h-20 outline outline-2 outline-offset-2 outline-gray-300 rounded-full'>
              <img src={selectedItem.avatar} alt={selectedItem.name} className='w-full h-full rounded-full object-cover' />
            </div>
            <div className='text-sm leading-loose'>
              <h1>{selectedItem.name}</h1>
              <div className='flex items-center gap-3'>
                {
                  selectedItem.phone &&
                  <>
                    <p>{selectedItem.phone}</p>
                    <p className='translate-y-[-2px]'>|</p>
                  </>
                }
                <p>{selectedItem.email}</p>
              </div>
              <p>Member since: {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className='mt-6'>
            <div>
              <p className='text-sm'>Register Type</p>
              <p className='mt-3 border border-gray-300 rounded-md p-2 capitalize bg-gray-100 text-sm'>{selectedItem.type === 'register' ? 'default' : selectedItem.type}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm'>Province</p>
              <p className='mt-3 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm'>{province ? province : 'Not Provided'}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm'>City</p>
              <p className='mt-3 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm'>{city ? city : 'Not Provided'}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm'>District</p>
              <p className='mt-3 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm'>{district ? district : 'Not Provided'}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm'>Postal Code</p>
              <p className='mt-3 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm'>{selectedItem.postalCode ? selectedItem.postalCode : 'Not Provided'}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm'>Address</p>
              <p className='mt-3 border border-gray-300 rounded-md p-2 h-20 bg-gray-100 text-sm'>{selectedItem.address ? selectedItem.address : 'Not Provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailModal