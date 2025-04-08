import { Link } from 'react-router-dom'
import Popover from 'src/components/Popover'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'
interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    // <Link
    //   to={`${path.home}${generateNameId({
    //     name: product.name,
    //     id: product._id
    //   })}`}
    // >
<div className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
  {/* Avatar */}
  <div className="relative bg-gray-100 pt-[100%]">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeKS_9ibIP5zooDeGTSpmnfzanze0Mi74Ew&s"
      alt={product.name}
      className="absolute inset-0 w-full h-full p-2 object-cover rounded-xl"
    />
    
    {/* Popover top-right */}
    <div className="absolute top-2 right-2 z-10">
      <Popover
        as="div"
        className="relative"
        renderPopover={
          <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="flex flex-col py-2 px-4">
              <button className="py-1 text-sm text-left hover:text-green-600">🔍 Kết Bạn</button>
              <button className="py-1 mt-1 text-sm text-left hover:text-red-500">😊 Hủy Kết Bạn</button>
            </div>
          </div>
        }
      >
        <div className="cursor-pointer p-1 bg-white rounded-full shadow hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582"
            />
          </svg>
        </div>
      </Popover>
    </div>
  </div>

  {/* User info */}
  <div className="p-4 text-center">
    <h3 className="text-sm font-bold text-gray-800 truncate">Nguyễn Tấn Thành</h3>
    <p className="text-xs text-gray-500 mt-1">Ngày tham gia: <span className="text-gray-700 font-medium">2025/09/20</span></p>
    <p className="text-xs text-gray-500 mt-1">📞 <span className="font-medium text-gray-700">0333657671</span></p>
  </div>
</div>

    // </Link>
  )
}
