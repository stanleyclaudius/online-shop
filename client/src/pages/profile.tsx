import Footer from "../components/general/Footer"
import Navbar from "../components/general/Navbar"
import Subscribe from "../components/general/Subscribe"
import Header from "../components/home/Header"

const Profile = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='m-auto bg-white md:w-8/12 w-10/12 drop-shadow-2xl -translate-y-10 p-5 font-opensans'>
        <div className='mb-8'>
          <h1 className='text-xl'>Edit Profile</h1>
          <form>
            <div className='mt-4'>
              <label htmlFor='name' className='text-sm'>Name</label>
              <input type='text' autoComplete='off' id='name' name='name' className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0' />
            </div>
            <div className='mt-4'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <input type='text' autoComplete='off' id='email' name='email' className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0 bg-gray-100' disabled />
            </div>
            <div className='mt-4'>
              <label htmlFor='phoneNumber' className='text-sm'>Phone Number</label>
              <input type='number' id='phoneNumber' name='phoneNumber' className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0' />
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2'>Save Changes</button>
          </form>
        </div>
        <div className='mb-8'>
          <h1 className='text-xl'>Address Information</h1>
          <form>
            <div className='mt-4 flex md:items-center md:gap-8 gap-5 flex-col md:flex-row'>
              <div className='flex-1'>
                <label htmlFor='province' className='text-sm'>Province</label>
                <select name='province' id='province' className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0 bg-white'>
                  <option value=''>- Select Province -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='city' className='text-sm'>City</label>
                <select name='city' id='city' className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0 bg-white'>
                  <option value=''>- Select City -</option>
                </select>
              </div>
            </div>
            <div className='mt-6 flex md:items-center md:gap-8 gap-5 flex-col md:flex-row'>
              <div className='flex-1'>
                <label htmlFor='district' className='text-sm'>District</label>
                <select name='district' id='district' className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0 bg-white'>
                  <option value=''>- Select District -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='postalCode' className='text-sm'>Postal Code</label>
                <input type='number' name='postalCode' id='postalCode' autoComplete='off' className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0' />
              </div>
            </div>
            <div className='mt-4'>
              <label htmlFor='address' className='text-sm'>Address</label>
              <textarea name='address' id='address' className='resize-none w-full border border-gray-300 text-sm p-2 rounded-md mt-2 outline-0' />
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2'>Save Changes</button>
          </form>
        </div>
        <div>
          <h1 className='text-xl'>Change Password</h1>
          <form>
            <div className='mt-4'>
              <label htmlFor='currentPassword' className='text-sm'>Current Password</label>
              <input type='password' autoComplete='off' id='currentPassword' name='currentPassword' className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0' />
            </div>
            <div className='mt-4'>
              <label htmlFor='newPassword' className='text-sm'>New Password</label>
              <input type='password' autoComplete='off' id='newPassword' name='newPassword' className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0' disabled />
            </div>
            <div className='mt-4'>
              <label htmlFor='newPasswordConfirmation' className='text-sm'>New Password Confirmation</label>
              <input type='password' autoComplete='off' id='newPasswordConfirmation' name='newPasswordConfirmation' className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0' disabled />
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2'>Save Changes</button>
          </form>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  )
}

export default Profile