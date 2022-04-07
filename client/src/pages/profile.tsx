import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputChange, FormSubmit, RootStore } from './../utils/Interface'
import { ALERT } from './../redux/types/alertTypes'
import { changePassword, editProfile } from './../redux/actions/authActions'
import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'
import Loader from '../components/general/Loader'
import NotFound from './../components/general/NotFound'
import HeadInfo from '../utils/HeadInfo'

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
    avatar: '',
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
  const [tempAvatar, setTempAvatar] = useState<File[]>([])
  const [provinceData, setProvinceData] = useState<IProvinceData[]>([])
  const [cityData, setCityData] = useState<ICityData[]>([])
  const [districtData, setDistrictData] = useState<IDistrictData[]>([])
  const [loading, setLoading] = useState('')

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleChangeImage = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = [...Object.values(target.files!)]
    setTempAvatar([...files])
  }

  const handleSubmit = async(e: FormSubmit, type: string) => {
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

        setLoading('profile')
        await dispatch(
          editProfile({
            ...profileData,
            province: `${auth.user?.province}`,
            city: `${auth.user?.city}`,
            district: `${auth.user?.district}`,
            postalCode: `${auth.user?.postalCode}`,
            address: `${auth.user?.address}`,
            tempAvatar
          }, auth)
        )
        setLoading('')
        break
      case 'address':
        setLoading('address')
        await dispatch(
          editProfile({
            ...profileData,
            name: `${auth.user?.name}`,
            phoneNumber: `${auth.user?.phone}`,
            avatar: `${auth.user?.avatar}`
          }, auth)
        )
        setLoading('')
        break
      case 'password':
        if (!profileData.currentPassword || !profileData.newPassword || !profileData.newPasswordConfirmation) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: 'Please provide current password, new password, and the confirmation.'
            }
          })
        }

        if (profileData.newPassword.length < 8) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: 'Password should be at least 8 characters.'
            }
          })
        }

        if (profileData.newPassword !== profileData.newPasswordConfirmation) {
          return dispatch({
            type: ALERT,
            payload: {
              errors: 'Password confirmation should be matched.'
            }
          })
        }

        setLoading('password')
        await dispatch(changePassword(profileData, auth.token!))
        setProfileData({ ...profileData, currentPassword: '', newPassword: '', newPasswordConfirmation: '' })
        setLoading('')
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
        avatar: auth.user.avatar,
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

  if (auth.user?.role !== 'user') {
    return <NotFound />
  }

  return (
    <>
      <HeadInfo title='Profile' />
      <Navbar />
      <Header />
      <div className='m-auto bg-white md:w-8/12 w-10/12 drop-shadow-2xl -translate-y-10 p-5 font-opensans'>
        <div className='mb-8'>
          <h1 className='text-xl'>Edit Profile</h1>
          <form onSubmit={e => handleSubmit(e, 'profile')}>
            <div className='flex gap-5 mt-4'>
              <div className='w-32 h-32 rounded-full outline outline-2 outline-gray-300 outline-offset-2 shrink-0'>
                <img src={tempAvatar.length > 0 ? URL.createObjectURL(tempAvatar[0]) : profileData.avatar} alt={profileData.name} className='w-full h-full rounded-full' />
              </div>
              <input type='file' accept='image/*' onChange={handleChangeImage} className='w-full rounded-md border border-gray-300 p-2 text-sm outline-0 self-start' />
            </div>
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
              disabled={loading === 'profile' ? true : false}
              className={`${loading === 'profile' ? 'bg-blue-300' : 'bg-blue-500'} ${loading === 'profile' ? 'hover:bg-blue-300' : 'hover:bg-blue-600'} ${loading === 'profile' ? 'cursor-auto' : 'cursor-pointer'} mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2`}
            >
              {
                loading === 'profile'
                ? <Loader />
                : 'Save Changes'
              }
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
              disabled={loading === 'address' ? true : false}
              className={`${loading === 'address' ? 'bg-blue-300' : 'bg-blue-500'} ${loading === 'address' ? 'hover:bg-blue-300' : 'hover:bg-blue-600'} ${loading === 'address' ? 'cursor-auto' : 'cursor-pointer '} mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2`}
            >
              {
                loading === 'address'
                ? <Loader />
                : 'Save Changes'
              }
            </button>
          </form>
        </div>
        {
          auth.user?.type === 'register' &&
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
                disabled={loading === 'password' ? true : false}
                className={`${loading === 'password' ? 'bg-blue-300' : 'bg-blue-500'} ${loading === 'password' ? 'hover:bg-blue-300' : 'hover:bg-blue-600'} ${loading === 'password' ? 'cursor-auto' : 'cursor-pointer'} mt-6 transition-[background] text-sm text-white rounded-md px-5 py-2`}
              >
                {
                  loading === 'password'
                  ? <Loader />
                  : 'Save Changes'
                }
              </button>
            </form>
          </div>
        }
      </div>
      <Subscribe />
      <Footer />
    </>
  )
}

export default Profile