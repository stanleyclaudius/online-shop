import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IQnaData } from '../../redux/types/qnaTypes'
import { RootStore } from '../../utils/Interface'
import Qna from './Qna'

interface IProps {
  item: IQnaData
}

const QnaDisplay: React.FC<IProps> = ({ item }) => {
  const [reply, setReply] = useState<IQnaData[]>([])
  const [replyFromComment, setReplyFromComment] = useState<IQnaData[]>([])
  
  const { qna } = useSelector((state: RootStore) => state)

  useEffect(() => {
    const commentWithReply = qna.data.filter(item => item.reply)
    setReply(commentWithReply)
  }, [qna])

  useEffect(() => {
    const correspondingReply = reply.filter(newReply => newReply.reply === item._id)
    setReplyFromComment(correspondingReply)
  }, [reply, item])

  return (
    <Qna item={item}>
      <div className='ml-[50px]'>
        {
          replyFromComment.map(itemReply => (
            <QnaDisplay item={itemReply} />
          ))
        }
      </div>
    </Qna>
  )
}

export default QnaDisplay