import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageRender from './utils/PageRender'
import Home from './pages/home'
import Alert from './components/general/Alert'
// import ReviewModal from './components/modal/ReviewModal'

const App = () => {
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