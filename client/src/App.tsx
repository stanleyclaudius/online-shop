import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { refreshToken } from './redux/actions/authActions'
import { OPEN_COMPARE_MODAL } from './redux/types/compareTypes'
import { RootStore } from './utils/Interface'
import PageRender from './utils/PageRender'
import Home from './pages/home'
import Alert from './components/general/Alert'
import CompareModal from './components/modal/CompareModal'
// import ReviewModal from './components/modal/ReviewModal'

const App = () => {
  const dispatch = useDispatch()
  const { compare } = useSelector((state: RootStore) => state)

  const compareRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (compare && compareRef.current && !compareRef.current.contains(e.target as Node)) {
        dispatch({
          type: OPEN_COMPARE_MODAL,
          payload: false
        })
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [compare, dispatch])

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <>
      <Alert />
      <Router>
        <CompareModal compareRef={compareRef} />
        
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