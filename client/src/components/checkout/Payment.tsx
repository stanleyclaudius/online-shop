const Payment = () => {
  return (
    <div className='mt-8 font-opensans'>
      <h1 className='text-2xl mb-6'>Payment Details</h1>
      <form>
        <div className='mb-6'>
          <label
            htmlFor='nameOnCard'
            className='text-gray-500'
          >
            Name on Card
          </label>
          <input
            type='text'
            autoComplete='off'
            id='nameonCard'
            name='nameonCard'
            className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='cardNumber'
            className='text-gray-500'
          >
            Card Number
          </label>
          <input
            type='text'
            autoComplete='off'
            id='cardNumber'
            name='cardNumber'
            className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
          />
        </div>
        <div className='flex items-center gap-10 mb-8'>
          <div className='flex-1'>
            <label
              htmlFor='expiration'
              className='text-gray-500'
            >
              Expiration (Month / Year)
            </label>
            <div className='flex items-center gap-3'>
              <input
                type='text'
                autoComplete='off'
                className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
              />
              <p className='translate-y-1'>/</p>
              <input
                type='text'
                autoComplete='off'
                className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
              />
            </div>
          </div>
          <div className='flex-1'>
            <label
              htmlFor='cvv'
              className='text-gray-500'
            >
              CVV
            </label>
            <input
              type='text'
              autoComplete='off'
              id='cvv'
              name='cvv'
              className='w-full border border-gray-300 rounded-md outline-0 p-2 text-sm mt-3'
            />
          </div>
        </div>
        <button className='bg-[#3552DC] hover:bg-[#122DB0] transition-[background] rounded-md text-sm text-white px-7 py-2'>Review Order</button>
      </form>
    </div>
  )
}

export default Payment