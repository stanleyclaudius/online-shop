import { IHomeCategoryData } from './../../redux/types/categoryTypes'

interface IProps {
  handleClickCategory: (item: string) => void
  item: IHomeCategoryData
  selectedCategory: string
}

const CategoryTag: React.FC<IProps> = ({ handleClickCategory, item, selectedCategory }) => {
  return (
    <div
      key={item._id}
      onClick={() => handleClickCategory(`${item._id}`)}
      className='flex items-center justify-between pl-11 pr-3 py-2 cursor-pointer'
    >
      <p className={`text-sm ${selectedCategory === item._id ? 'underline' : undefined}`}>{item.name}</p>
      <p className='text-sm text-gray-500'>{item.count}</p>
    </div>
  )
}

export default CategoryTag