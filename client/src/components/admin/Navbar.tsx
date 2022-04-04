import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillBell } from 'react-icons/ai'
import { BsPower } from 'react-icons/bs'
import { RootStore } from './../../utils/Interface'
import { logout } from './../../redux/actions/authActions'
import { getNotification } from './../../redux/actions/notificationActions'
import HistoryModal from '../modal/HistoryModal'
import { ICheckoutData } from '../../redux/types/checkoutTypes'
import { ALERT } from '../../redux/types/alertTypes'
import { getDataAPI } from '../../utils/fetchData'

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState<ICheckoutData>()
  const [openNotificationDropdown, setOpenNotificationDropdown] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const notificationDropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const detailModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, notification } = useSelector((state: RootStore) => state)

  const handleLogout = async() => {
    await dispatch(logout(auth.token!))
    navigate('/')
  }
  
  const handleClickDetail = async(id: string) => {
    try {
      const res = await getDataAPI(`checkout/${id}`, auth.token!)
      setSelectedItem(res.data.transaction)
      setOpenDetailModal(true)
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: {
          errors: err.response.data.msg
        }
      })
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openNotificationDropdown && notificationDropdownRef.current && !notificationDropdownRef.current.contains(e.target as Node)) {
        setOpenNotificationDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNotificationDropdown])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDetailModal && detailModalRef.current && !detailModalRef.current.contains(e.target as Node)) {
        setOpenDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDetailModal])

  useEffect(() => {
    dispatch(getNotification(auth.token!))
  }, [dispatch, auth.token])

  return (
    <>
      <div className='flex items-center justify-end gap-8 text-lg'>
        <div className='text-sm flex items-center gap-4'>
          <div className='w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center outline outline-2 outline-offset-2 outline-gray-200'>
            <img src={auth.user?.avatar} alt={auth.user?.name} className='w-full h-full rounded-full object-cover' />
          </div>
          <p>{auth.user?.email}</p>
        </div>
        <div ref={notificationDropdownRef} className='relative'>
          <AiFillBell onClick={() => setOpenNotificationDropdown(!openNotificationDropdown)} className='cursor-pointer' />
          {
            notification.length !== 0 &&
            <div className={`absolute top-[100%] mt-4 transition-[background] border boder-gray-300 rounded-md shadow-xl w-[300px] right-0 bg-white ${openNotificationDropdown ? 'scale-y-1' : 'scale-y-0'} origin-top transition-[transform] max-h-[300px] overflow-auto hide-scrollbar`}>
              {
                notification.map(item => (
                  <div key={item._id} onClick={() => handleClickDetail(item.transaction)} className='p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-300'>
                    <p className='text-sm leading-loose'>
                      <b>{item.message.substring(0, item.message.indexOf('just'))}</b>
                      {item.message.substring(item.message.indexOf('just'), item.message.length)}
                    </p>
                  </div>
                ))
              }
            </div>
          }
        </div>
        <BsPower onClick={handleLogout} className='cursor-pointer' />
      </div>

      <HistoryModal
        modalRef={detailModalRef}
        openHistoryModal={openDetailModal}
        setOpenHistoryModal={setOpenDetailModal}
        selectedItem={selectedItem}
      />
    </>
  )
}

export default Navbar