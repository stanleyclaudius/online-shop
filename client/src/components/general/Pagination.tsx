import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface IProps {
  selectedPage: number
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}

const Pagination: React.FC<IProps> = ({ selectedPage, setSelectedPage, totalPage }) => {
  const handleArrow = (type: string) => {
    switch (type) {
      case 'prev':
        if (selectedPage !== 1) {
          setSelectedPage(selectedPage - 1)
        }
        break
      case 'next':
        if (selectedPage !== totalPage) {
          setSelectedPage(selectedPage + 1)
        }
        break
      default:
        return
    }
  }

  const handleClickPage = (page: number) => {
    setSelectedPage(page)
  }

  return (
    <div className='flex items-center justify-between border-r border-b border-gray-300'>
      {
        selectedPage !== 1 &&
        <div className='p-3 cursor-pointer' onClick={() => handleArrow('prev')}>
          <BiChevronLeft className='text-2xl text-gray-500' />
        </div>
      }
      <div className='flex items-center border-l flex-1 border-r border-gray-300 justify-center'>
        {
          Array.from(Array(totalPage).keys()).map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleClickPage(idx + 1)}
              className={`py-3 px-5 cursor-pointer hover:bg-[#3552DC] hover:text-white ${selectedPage === idx + 1 ? 'bg-[#3552DC] text-white' : undefined}`}
            >
              {idx + 1}
            </div>
          ))
        }
      </div>
      {
        selectedPage !== totalPage &&
        <div className='p-3 cursor-pointer' onClick={() => handleArrow('next')}>
          <BiChevronRight className='text-2xl text-gray-500' />
        </div>
      }
    </div>
  )
}

export default Pagination