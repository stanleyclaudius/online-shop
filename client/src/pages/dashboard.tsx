import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'

const Dashboard = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='px-10 py-5 w-full'>
        <Navbar />
      </div>
    </div>
  )
}

export default Dashboard