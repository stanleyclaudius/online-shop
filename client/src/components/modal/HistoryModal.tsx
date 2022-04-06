import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FaPercentage } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { GoPackage } from 'react-icons/go'
import { ICheckoutData } from '../../redux/types/checkoutTypes'
import { getDataAPI } from '../../utils/fetchData'
import { numberFormatter } from '../../utils/numberFormatter'
import { RootStore } from '../../utils/Interface'

interface IProps {
  modalRef: React.MutableRefObject<HTMLDivElement>
  openHistoryModal: boolean
  setOpenHistoryModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedItem?: ICheckoutData
}

const HistoryModal: React.FC<IProps> = ({ modalRef, openHistoryModal, setOpenHistoryModal, selectedItem }) => {
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (selectedItem?.chargeId) {
      getDataAPI(`checkout/status/${selectedItem?.chargeId}`, auth.token!)
        .then(res => {
          setPaymentStatus(res.data.status.status)
        })
    }
  }, [selectedItem?.chargeId, auth.token])

  useEffect(() => {
    if (selectedItem?.province) {
      getDataAPI(`courier/province/${selectedItem?.province}`)
        .then(res => {
          setProvince(res.data.province.rajaongkir.results.province)
        })
    }
  }, [selectedItem?.province])

  useEffect(() => {
    if (selectedItem?.city) {
      getDataAPI(`courier/city/detail/${selectedItem?.city}`)
        .then(res => {
          setCity(res.data.city.rajaongkir.results.city_name)
        })
    }
  }, [selectedItem?.city])

  return (
    <div className={`${openHistoryModal ? 'opacity-100' : 'opacity-0'} ${openHistoryModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-10 font-opensans`}>
      <div
        ref={modalRef}
        className={`${openHistoryModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between px-7 py-3 border-b border-gray-300'>
          <h1 className='text-lg'>Transaction Detail</h1>
          <AiOutlineClose
            onClick={() => setOpenHistoryModal(false)}
            className='cursor-pointer'
          />
        </div>
        <div className='px-7 pb-5 max-h-[60vh] overflow-auto hide-scrollbar'>
          <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <MdLocationOn className='text-5xl' />
            </div>
            <div>
              <h1 className='font-oswald text-lg'>{province}, {city}, {selectedItem?.district}, {selectedItem?.postalCode}</h1>
              <p className='text-sm my-1'>{selectedItem?.address}</p>
              <p className='text-sm'>{selectedItem?.expedition} - {selectedItem?.expeditionService}: {numberFormatter(selectedItem?.expeditionFee!)}</p>
            </div>
          </div>
          <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <GoPackage className='text-5xl' />
            </div>
            <div>
              <h1 className='font-oswald text-lg'>{selectedItem?.recipientName}</h1>
              <p className='text-sm my-1'>{selectedItem?.recipientEmail}</p>
              <p className='text-sm'>{selectedItem?.recipientPhone}</p>
            </div>
          </div>
          <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <RiSecurePaymentLine className='text-5xl' />
            </div>
            <div>
              <div className='flex items-center gap-4'>
                <h1 className='font-oswald text-lg'>Payment Method</h1>
                <p className={`text-xs font-medium text-white ${paymentStatus === 'SUCCEEDED' ? 'bg-green-500' : 'bg-orange-500'} rounded-md p-1`}>{paymentStatus}</p>
              </div>
              <p className='text-sm my-1'>OVO: +{selectedItem?.ovoPhoneNumber}</p>
            </div>
          </div>
          {
            selectedItem?.items.map(item => (
              <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
                <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
                  <img src={typeof item.product === 'string' ? item.product : item.product.images[0]} alt={typeof item.product === 'string' ? item.product : item.product.name} />
                </div>
                <div>
                  <h1 className='font-oswald text-lg'>{typeof item.product === 'string' ? item.product : item.product.name}</h1>
                  <p className='text-sm my-1'>Qty: {item.qty}</p>
                  <p className='text-sm my-1'>Price: {typeof item.product === 'string' ? item.product : numberFormatter(item.product.price)} x {item.qty}</p>
                  {item.discount !== 0 && <p className='text-sm'>Discount per item: {item.discount}%</p>}
                </div>
              </div>
            ))
          }
          {
            selectedItem?.discount &&
            <div className='flex items-center gap-7 pt-5'>
              <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
                <FaPercentage className='text-5xl' />
              </div>
              <div>
                <h1 className='font-oswald text-lg'>{selectedItem?.discount.code}</h1>
                <p className='text-sm my-1'>Discount Voucher</p>
                <p className='text-sm'>{selectedItem?.discount.value}%</p>
              </div>
            </div>
          }
        </div>
        <div className='flex items-center justify-between px-7 py-3 border-t border-gray-300'>
          <h1 className='font-bold'>Total</h1>
          <p>{numberFormatter(selectedItem?.totalPrice!)},00</p>
      </div>
      </div>
    </div>
  )
}

export default HistoryModal