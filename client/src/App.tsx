import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { refreshToken } from './redux/actions/authActions'
import PageRender from './utils/PageRender'
import Home from './pages/home'
import Alert from './components/general/Alert'
// import ReviewModal from './components/modal/ReviewModal'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <>
      <Alert />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:id' element={<PageRender />} />
        </Routes>
      </Router>

      {/* <ReviewModal /> */}
    </>
  )
}

export default App