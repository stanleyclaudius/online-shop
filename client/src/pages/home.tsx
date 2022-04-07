import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import ProductList from './../components/home/ProductList'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'
import HeadInfo from '../utils/HeadInfo'

const Home = () => {
  return (
    <>
      <HeadInfo title='Home' />
      <Navbar />
      <Header />
      <ProductList />
      <Subscribe />
      <Footer />
    </>
  )
}

export default Home