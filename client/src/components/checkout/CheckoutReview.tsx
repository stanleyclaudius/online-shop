const CheckoutReview = () => {
  return (
    <div className='mt-8 font-opensans'>
      <h1 className='text-2xl mb-6'>Review Order</h1>
      <div className='flex items-center gap-32 mb-10'>
        <div>
          <p className='mb-3 text-gray-500 font-bold'>Recipient</p>
          <p className='mb-1'>User Lorem Ipsum</p>
          <p className='mb-1'>0812 1234 5678</p>
          <p className='mb-1'>lorem@ipsum.com</p>
        </div>
        <div>
          <p className='mb-3 text-gray-500 font-bold'>Shipping Address</p>
          <p className='mb-1'>North Sumatra</p>
          <p className='mb-1'>Medan, Medan Area, 20222</p>
          <p className='mb-1'>Jln. XYZ Test 24AB</p>
        </div>
      </div>
      <div>
        <p className='mb-3 text-gray-500 font-bold'>Payment Detail</p>
        <p className='mb-1'>Credit Card</p>
        <p className='mb-1'>John Doe</p>
        <p className='mb-1'>4000 33922 939393</p>
        <p className='mb-1'>03/22</p>
        <p className='mb-1'>123</p>
      </div>
    </div>
  )
}

export default CheckoutReview