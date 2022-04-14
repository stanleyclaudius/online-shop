import { useEffect, useState } from 'react'

interface IProps {
  handleClickSize: (item: number) => void
  item: number
  selectedSize: number[]
}

const SizeTag: React.FC<IProps> = ({ handleClickSize, item, selectedSize }) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    handleClickSize(item)
    setIsActive(!isActive)
  }

  useEffect(() => {
    if (!selectedSize.includes(item)) {
      setIsActive(false)
    }

    return () => setIsActive(true)
  }, [selectedSize])

  return (
    <div
      key={item}
      onClick={handleClick}
      className={`border border-gray-300 flex items-center justify-center py-2 cursor-pointer hover:bg-[#415DDA] hover:text-white transition-all ${isActive ? 'bg-[#415DDA] text-white' : undefined}`}
    >
      {item}
    </div>
  )
}

export default SizeTag