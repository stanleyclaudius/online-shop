import HamburgerMenu from './../components/general/HamburgerMenu'
import Navbar from './../components/general/Navbar'

const Home = () => {
  return (
    <div className='bg-[#F4F5FA] flex'>
      <div>
        <div className='cursor-pointer bg-[#2D1E1C] p-6'>
          <HamburgerMenu />
        </div>
      </div>
      <div className='flex-1 pr-10'>
        <Navbar />
      </div>
    </div>
  )
}

export default Home