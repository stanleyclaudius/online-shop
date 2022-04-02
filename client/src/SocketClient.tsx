import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_QNA, ILikeUnlikeQnaData, IQnaData, LIKE_QNA, UNLIKE_QNA } from './redux/types/qnaTypes'
import { CREATE_REVIEW, ILikeUnlikeReviewData, IReviewData, LIKE_REVIEW, UNLIKE_REVIEW } from './redux/types/reviewTypes'
import { RootStore } from './utils/Interface'

const SocketClient = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (!socket) return

    socket.on('createQnaToClient', (data: IQnaData) => {
      dispatch({
        type: CREATE_QNA,
        payload: data
      })
    })

    return () => socket.off('createQnaToClient')
  }, [dispatch, socket])

  useEffect(() => {
    if (!socket) return
    
    socket.on('likeQnaToClient', (data: ILikeUnlikeQnaData) => {
      dispatch({
        type: LIKE_QNA,
        payload: data
      })
    })

    return () => socket.off('likeQnaToClient')
  }, [dispatch, socket])

  useEffect(() => {
    if (!socket) return

    socket.on('unlikeQnaToClient', (data: ILikeUnlikeQnaData) => {
      dispatch({
        type: UNLIKE_QNA,
        payload: data
      })
    })

    return () => socket.off('unlikeQnaToClient')
  }, [dispatch, socket])

  useEffect(() => {
    if (!socket) return

    socket.on('createReviewToClient', (data: IReviewData) => {
      dispatch({
        type: CREATE_REVIEW,
        payload: data
      })
    })

    return () => socket.off('createReviewToClient')
  }, [dispatch, socket])

  useEffect(() => {
    if (!socket) return

    socket.on('likeReviewToClient', (data: ILikeUnlikeReviewData) => {
      dispatch({
        type: LIKE_REVIEW,
        payload: data
      })
    })

    return () => socket.off('likeReviewToClient')
  }, [socket, dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on('unlikeReviewToClient', (data: ILikeUnlikeReviewData) => {
      dispatch({
        type: UNLIKE_REVIEW,
        payload: data
      })
    })

    return () => socket.off('unlikeReviewToClient')
  }, [socket, dispatch])

  return (
    <div></div>
  )
}

export default SocketClient