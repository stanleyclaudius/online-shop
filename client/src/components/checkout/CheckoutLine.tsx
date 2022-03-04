interface IProps {
  setCurrPage: React.Dispatch<React.SetStateAction<string>>
}

const CheckoutLine: React.FC<IProps> = ({ setCurrPage }) => {
  return (
    <div>
      <div className='relative w-full h-[2px] bg-[#BAC0BD]'>
        <div
          onClick={() => setCurrPage('account')}
          className='absolute top-50% -translate-y-[50%] left-0 w-2 h-2 rounded-full bg-[#3552DC] outline outline-[#3552DC] outline-offset-2 cursor-pointer'
        />
        <div
          onClick={() => setCurrPage('shipping')}
          className='absolute top-50% -translate-y-[50%] left-[33%] w-2 h-2 rounded-full bg-[#3552DC] outline outline-[#3552DC] outline-offset-2 cursor-pointer'
        />
        <div
          onClick={() => setCurrPage('payment')}
          className='absolute top-50% -translate-y-[50%] left-[66%] w-2 h-2 rounded-full bg-[#3552DC] outline outline-[#3552DC] outline-offset-2 cursor-pointer'
        />
        <div
          onClick={() => setCurrPage('review')}
          className='absolute top-50% -translate-y-[50%] left-[100%] w-2 h-2 rounded-full bg-[#3552DC] outline outline-[#3552DC] outline-offset-2 cursor-pointer'
        />
        <div className='absolute top-0 left-0 w-[33%] h-[2px] bg-[#3552DC]' />
      </div>
      <div className='flex items-center justify-between mt-5 font-opensans text-sm'>
        <p className='-translate-x-7'>Account</p>
        <p className='-translate-x-3'>Shipping</p>
        <p className='translate-x-1'>Payment</p>
        <p className='translate-x-8'>Review</p>
      </div>
    </div>
  )
}

export default CheckoutLine