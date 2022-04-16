import Sidebar from './../../components/admin/Sidebar'
import Navbar from './../../components/admin/Navbar'

interface IProps {
  children: React.ReactElement
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='px-10 py-5 w-full'>
        <Navbar />
        <div className='font-opensans mt-9'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout