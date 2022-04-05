import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_NOTIFICATION, INotificationData } from './redux/types/notificationTypes'
import { CREATE_QNA, ILikeUnlikeQnaData, IQnaData, LIKE_QNA, UNLIKE_QNA } from './redux/types/qnaTypes'
import { CREATE_REVIEW, ILikeUnlikeReviewData, IReviewData, LIKE_REVIEW, UNLIKE_REVIEW } from './redux/types/reviewTypes'
import { RootStore } from './utils/Interface'

const SocketClient = () => {
  const dispatch = useDispatch()
  const { auth, socket } = useSelector((state: RootStore) => state)

  const audioRef = useRef() as React.RefObject<HTMLAudioElement>

  useEffect(() => {
    if (auth.token) {
      socket.emit('joinUser', auth.user)
    }
  }, [socket, auth])

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

  useEffect(() => {
    if (!socket) return

    socket.on('createNotificationToClient', (data: INotificationData) => {
      dispatch({
        type: CREATE_NOTIFICATION,
        payload: data
      })
      audioRef.current?.play()
    })

    return () => socket.off('createNotificationToClient')
  }, [socket, dispatch])

  return (
    <div>
      <audio controls ref={audioRef} style={{ display: 'none' }}>
        <source src={`${process.env.PUBLIC_URL}/audio/notification.mp3`} type='audio/mp3' />
      </audio>
    </div>
  )
}

export default SocketClient