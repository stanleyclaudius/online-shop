import Layout from '../components/admin/Layout'

const Newsletter = () => {
  return (
    <Layout>
      <div className='flex items-center justify-between gap-10'>
        <h1 className='text-2xl tracking-wide font-oswald'>Newsletter Management</h1>
        <button
          className='bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-600 transition-[background] text-sm text-white'
        >
          Compose Newsletter
        </button>
      </div>
    </Layout>
  )
}

export default Newsletter