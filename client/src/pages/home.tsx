import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import ProductList from './../components/home/ProductList'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ProductList />
      <Subscribe />
      <Footer />
    </>
  )
}

export default Home