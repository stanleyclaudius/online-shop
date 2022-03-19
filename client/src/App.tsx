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
import ReviewModal from './components/modal/ReviewModal'
import { OPEN_REVIEW_MODAL } from './redux/types/reviewTypes'

const App = () => {
  const dispatch = useDispatch()
  const { compare, review } = useSelector((state: RootStore) => state)

  const compareRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const reviewRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (compare.isOpen && compareRef.current && !compareRef.current.contains(e.target as Node)) {
        dispatch({
          type: OPEN_COMPARE_MODAL,
          payload: false
        })
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [compare.isOpen, dispatch])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (review.isOpen && reviewRef.current && !reviewRef.current.contains(e.target as Node)) {
        dispatch({
          type: OPEN_REVIEW_MODAL,
          payload: false
        })
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [review.isOpen, dispatch])

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <>
      <Alert />
      <Router>
        <CompareModal compareRef={compareRef} />
        <ReviewModal reviewRef={reviewRef} />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:id' element={<PageRender />} />
        </Routes>
      </Router>
    </>
  )
}

export default App