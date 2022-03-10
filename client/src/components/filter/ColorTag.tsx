import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface IProps {
  handleClickColor: (item: string) => void
  item: string
}

const ColorTag: React.FC<IProps> = ({ handleClickColor, item }) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    handleClickColor(item)
    setIsActive(!isActive)
  }

  return (
    <div key={item} onClick={handleClick} className='relative w-6 h-6 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-gray-300 hover:outline-offset-2' style={{ background: item }}>
      {
        isActive && (
          <div className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-sm' onClick={() => setIsActive(false)}>
            <AiOutlineClose />
          </div>
        )
      }
    </div>
  )
}

export default ColorTag