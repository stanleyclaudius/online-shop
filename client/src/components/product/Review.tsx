import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { IReviewData } from '../../redux/types/reviewTypes'
import { RootStore } from '../../utils/Interface'
import { likeReview, unlikeReview } from '../../redux/actions/reviewActions'
import { ALERT } from '../../redux/types/alertTypes'

interface IProps {
  item: IReviewData
}

const Review: React.FC<IProps> = ({ item }) => {
  const [isLike, setIsLike] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleLike = () => {
    if (!auth.token) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please login to like review.'
        }
      })
    }

    if (isLike) {
      setIsLike(false)
      dispatch(unlikeReview(item._id!, auth.user?._id!, auth.token!))
    } else {
      setIsLike(true)
      dispatch(likeReview(item._id!, auth.user?._id!, auth.token!))
    }
  }

  useEffect(() => {
    const findLike = item.like?.find(i => i === auth.user?._id)
    if (findLike) {
      setIsLike(true)
    }

    return () => setIsLike(false)
  }, [auth.user, item])

  return (
    <div className='flex md:flex-row flex-col gap-8 border-b border-gray-300 py-7'>
      <div className='flex gap-5'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'>
          <img src={item.user.avatar} alt={item.user.name} className='rounded-full' />
        </div>
        <div>
          <p className='font-bold font-opensans text-xs mb-1'>{item.user.name}</p>
          <div className='flex items-center'>
            {
              Array.from(Array(item.star).keys()).map((_, idx) => (
                <AiFillStar className='text-sm text-orange-400' />
              ))
            }

            {
              Array.from(Array(5 - item.star).keys()).map((_, idx) => (
                <AiFillStar className='text-sm text-gray-300' />
              ))
            }
          </div>
        </div>
      </div>
      <div>
        <p className='font-opensans text-sm text-justify text-gray-600 leading-6'>
          {item.content}
        </p>
        <div className={`flex items-center gap-2 mt-3 text-gray-400 text-sm`}>
          <AiFillHeart onClick={handleLike} className={`${isLike ? 'text-red-500' : 'text-gray-400'} cursor-pointer`} />
          {item.like?.length}
        </div>
      </div>
    </div>
  )
}

export default Review