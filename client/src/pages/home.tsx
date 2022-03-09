import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeProduct } from './../redux/actions/productActions'
import { getBrand } from './../redux/actions/brandActions'
import { getCategory } from './../redux/actions/categoryActions'
import { RootStore } from './../utils/Interface'
import { IHomeProductData } from './../redux/types/homeProductTypes'
import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import ProductList from './../components/home/ProductList'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'

const Home = () => {
  const [products, setProducts] = useState<IHomeProductData[]>([])

  const dispatch = useDispatch()
  const { brand, homeProduct: product } = useSelector((state: RootStore) => state)

  useEffect(() => {
    dispatch(getHomeProduct())
    dispatch(getBrand())
    dispatch(getCategory())
  }, [dispatch])

  useEffect(() => {
    setProducts(product.data)
  }, [product])

  return (
    <>
      <Navbar />
      <Header />
      <ProductList products={products} brands={brand.data} />
      <Subscribe />
      <Footer />
    </>
  )
}

export default Home