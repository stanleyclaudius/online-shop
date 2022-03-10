import { AiOutlineClose } from 'react-icons/ai'
import { FaPercentage } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { RiSecurePaymentLine } from 'react-icons/ri'

interface IProps {
  modalRef: React.MutableRefObject<HTMLDivElement>
  openHistoryModal: boolean
  setOpenHistoryModal: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryModal: React.FC<IProps> = ({ modalRef, openHistoryModal, setOpenHistoryModal }) => {
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
              <h1 className='font-oswald text-lg'>North Sumatra, Medan, Medan Area, 20222</h1>
              <p className='text-sm my-1'>Jln. Lorem Ipsum, No 25AB</p>
              <p className='text-sm'>JNE: IDR 100K</p>
            </div>
          </div>
          <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <RiSecurePaymentLine className='text-5xl' />
            </div>
            <div>
              <h1 className='font-oswald text-lg'>Payment Method</h1>
              <p className='text-sm my-1'>Credit Card: 4000 8383 8334 4732</p>
              <p className='text-sm'>John Doe</p>
            </div>
          </div>
          <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt='Nike Air Jordan' />
            </div>
            <div>
              <h1 className='font-oswald text-lg'>Product name goes here</h1>
              <p className='text-sm my-1'>Qty: 5</p>
              <p className='text-sm'>Price: IDR 200K x 5</p>
            </div>
          </div>
          <div className='flex items-center gap-7 py-5 border-b border-gray-300'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <img src={`${process.env.PUBLIC_URL}/images/shoes-single.png`} alt='Nike Air Jordan' />
            </div>
            <div>
              <h1 className='font-oswald text-lg'>Product name goes here</h1>
              <p className='text-sm my-1'>Qty: 5</p>
              <p className='text-sm'>Price: IDR 200K x 5</p>
            </div>
          </div>
          <div className='flex items-center gap-7 pt-5'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center p-2'>
              <FaPercentage className='text-5xl' />
            </div>
            <div>
              <h1 className='font-oswald text-lg'>SNEAKERSHUBGRANDOPENING</h1>
              <p className='text-sm my-1'>Discount Voucher</p>
              <p className='text-sm'>IDR 100K</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between px-7 py-3 border-t border-gray-300'>
          <h1 className='font-bold'>Total</h1>
          <p>IDR 1,250K</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryModal