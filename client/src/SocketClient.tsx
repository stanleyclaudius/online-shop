import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_QNA, ILikeUnlikeQnaData, IQnaData, LIKE_QNA, UNLIKE_QNA } from './redux/types/qnaTypes'
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

  return (
    <div></div>
  )
}

export default SocketClient