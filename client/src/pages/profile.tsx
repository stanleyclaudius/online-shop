import { useState } from 'react'
import { InputChange, FormSubmit } from './../utils/Interface'
import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    province: '',
    city: '',
    district: '',
    postalCode: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  })

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit, type: string) => {
    e.preventDefault()
    switch (type) {
      case 'profile':
        alert('profile')
        break
      case 'address':
        alert('address')
        break
      case 'password':
        alert('password')
        break
      default:
        break
    }
  }

  return (
    <>
      <Navbar />
      <Header />
      <div className='m-auto bg-white md:w-8/12 w-10/12 drop-shadow-2xl -translate-y-10 p-5 font-opensans'>
        <div className='mb-8'>
          <h1 className='text-xl'>Edit Profile</h1>
          <form onSubmit={e => handleSubmit(e, 'profile')}>
            <div className='mt-4'>
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
                value={profileData.name}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='email'
                className='text-sm'
              >
                Email
              </label>
              <input
                type='text'
                disabled
                className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0 bg-gray-100'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='phoneNumber'
                className='text-sm'
              >
                Phone Number
              </label>
              <input
                type='number'
                autoComplete='off'
                id='phoneNumber'
                name='phoneNumber'
                value={profileData.phoneNumber}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2'
            >
              Save Changes
            </button>
          </form>
        </div>
        <div className='mb-8'>
          <h1 className='text-xl'>Address Information</h1>
          <form onSubmit={e => handleSubmit(e, 'address')}>
            <div className='mt-4 flex md:items-center md:gap-8 gap-5 flex-col md:flex-row'>
              <div className='flex-1'>
                <label
                  htmlFor='province'
                  className='text-sm'
                >
                  Province
                </label>
                <select
                  id='province'
                  name='province'
                  value={profileData.province}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0 bg-white'
                >
                  <option value=''>- Select Province -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label
                  htmlFor='city'
                  className='text-sm'
                >
                  City
                </label>
                <select
                  id='city'
                  name='city'
                  value={profileData.city}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0 bg-white'
                >
                  <option value=''>- Select City -</option>
                </select>
              </div>
            </div>
            <div className='mt-6 flex md:items-center md:gap-8 gap-5 flex-col md:flex-row'>
              <div className='flex-1'>
                <label
                  htmlFor='district'
                  className='text-sm'
                >
                  District
                </label>
                <select
                  id='district'
                  name='district'
                  value={profileData.district}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0 bg-white'
                >
                  <option value=''>- Select District -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label
                  htmlFor='postalCode'
                  className='text-sm'
                >
                  Postal Code
                </label>
                <input
                  type='number'
                  autoComplete='off'
                  id='postalCode'
                  name='postalCode'
                  value={profileData.postalCode}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 text-sm rounded-md mt-2 outline-0'
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='address'
                className='text-sm'
              >
                Address
              </label>
              <textarea
                id='address'
                name='address'
                value={profileData.address}
                onChange={handleChange}
                className='resize-none w-full border border-gray-300 text-sm p-2 rounded-md mt-2 outline-0'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2'
            >
              Save Changes
            </button>
          </form>
        </div>
        <div>
          <h1 className='text-xl'>Change Password</h1>
          <form onSubmit={e => handleSubmit(e, 'password')}>
            <div className='mt-4'>
              <label
                htmlFor='currentPassword'
                className='text-sm'
              >
                Current Password
              </label>
              <input
                type='password'
                id='currentPassword'
                name='currentPassword'
                value={profileData.currentPassword}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='newPassword'
                className='text-sm'
              >
                New Password
              </label>
              <input
                type='password'
                id='newPassword'
                name='newPassword'
                value={profileData.newPassword}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='newPasswordConfirmation'
                className='text-sm'
              >
                New Password Confirmation
              </label>
              <input
                type='password'
                id='newPasswordConfirmation'
                name='newPasswordConfirmation'
                value={profileData.newPasswordConfirmation}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 text-sm mt-2 outline-0'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2'
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  )
}

export default Profile