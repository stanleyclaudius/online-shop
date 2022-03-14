import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputChange, FormSubmit, RootStore } from './../utils/Interface'
import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'
import { ALERT } from '../redux/types/alertTypes'
import { editProfile } from '../redux/actions/authActions'

interface IProvinceData {
  id: number
  nama: string
}

interface ICityData extends IProvinceData {
  id_provinsi: string
}

interface IDistrictData extends IProvinceData {
  id_kota: string
}

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
  const [provinceData, setProvinceData] = useState<IProvinceData[]>([])
  const [cityData, setCityData] = useState<ICityData[]>([])
  const [districtData, setDistrictData] = useState<IDistrictData[]>([])

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit, type: string) => {
    e.preventDefault()
    switch (type) {
      case 'profile':
        if (!profileData.name) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: 'Please provide your name.'
            }
          })
        }

        dispatch(
          editProfile({
            ...profileData,
            province: auth.user?.province,
            city: auth.user?.city,
            district: auth.user?.district,
            postalCode: auth.user?.postalCode,
            address: auth.user?.address
          }, auth.token!)
        )
        break
      case 'address':
        dispatch(
          editProfile({
            ...profileData,
            name: auth.user?.name,
            phoneNumber: auth.user?.phone
          }, auth.token!)
        )
        break
      case 'password':
        alert('password')
        break
      default:
        break
    }
  }

  useEffect(() => {
    const getProvinceData = () => {
      fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then(res => res.json())
        .then(res => setProvinceData(res.provinsi))
    }

    getProvinceData()
  }, [])

  useEffect(() => {
    const getCityData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${profileData.province}`)
        .then(res => res.json())
        .then(res => setCityData(res.kota_kabupaten))
    }

    if (profileData.province)
      getCityData()
    
    return () => setCityData([])
  }, [profileData.province])

  useEffect(() => {
    const getDistrictData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${profileData.city}`)
        .then(res => res.json())
        .then(res => setDistrictData(res.kecamatan))
    }

    if (profileData.city)
      getDistrictData()
    
    return () => setDistrictData([])
  }, [profileData.city])

  useEffect(() => {
    if (auth.user) {
      setProfileData({
        name: auth.user.name,
        phoneNumber: auth.user.phone,
        province: auth.user.province,
        city: auth.user.city,
        district: auth.user.district,
        postalCode: auth.user.postalCode,
        address: auth.user.address,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
      })
    }
  }, [auth.user])

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
                defaultValue={auth.user?.email}
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
                  {
                    provinceData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))
                  }
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
                  {
                    cityData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))
                  }
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
                  {
                    districtData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))
                  }
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