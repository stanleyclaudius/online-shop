import Header from './../components/home/Header'
import Navbar from './../components/navbar/Navbar'
import ProductList from './../components/home/ProductList'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Header />
        <ProductList />
      </div>
    </div>
  )
}

export default Home