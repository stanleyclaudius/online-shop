import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col'>
      <p className='font-oswald text-2xl uppercase mb-3'>Sneakershub</p>
      <p className='font-opensans text-lg mb-5'>404 | Oops ... You got lost?</p>
      <Link className='bg-[#3853D8] hover:bg-blue-600 text-white text-sm rounded-md px-5 py-3' to='/'>Home</Link>
    </div>
  )
}

export default NotFound