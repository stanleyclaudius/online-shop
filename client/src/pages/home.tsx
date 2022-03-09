import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from './../redux/actions/productActions'
import { IProductData } from './../redux/types/productTypes'
import { getBrand } from './../redux/actions/brandActions'
import { getCategory } from './../redux/actions/categoryActions'
import { RootStore } from './../utils/Interface'
import Navbar from './../components/general/Navbar'
import Header from './../components/home/Header'
import ProductList from './../components/home/ProductList'
import Subscribe from './../components/general/Subscribe'
import Footer from './../components/general/Footer'

const Home = () => {
  const [products, setProducts] = useState<IProductData[]>([])

  const dispatch = useDispatch()
  const { category, brand, product } = useSelector((state: RootStore) => state)

  useEffect(() => {
    dispatch(getProduct())
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
      <ProductList products={products} brands={brand.data} categories={category.data} />
      <Subscribe />
      <Footer />
    </>
  )
}

export default Home