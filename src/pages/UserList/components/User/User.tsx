import { Link } from 'react-router-dom'
import Popover from 'src/components/Popover'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function User({ product }: Props) {
  return (
    <div className='group relative w-full max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-md'>
      {/* Avatar */}
      <div className='relative'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeKS_9ibIP5zooDeGTSpmnfzanze0Mi74Ew&s'
          alt={product.name}
          className='mx-auto mt-4 h-20 w-20 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300'
        />
        {/* Popover Button */}
        <div className='absolute top-2 right-2'>
          <Popover
            as='div'
            className='relative'
            renderPopover={
              <div className='w-36 rounded-md border bg-white py-2 shadow-lg text-sm'>
                <button className='block w-full px-4 py-1 hover:bg-gray-100'>🔍 Kết bạn</button>
                <button className='block w-full px-4 py-1 hover:bg-gray-100'>😊 Hủy kết bạn</button>
                <button className='block w-full px-4 py-1 hover:bg-gray-100'>👤 Trang cá nhân</button>
              </div>
            }
          >
            <div className='cursor-pointer rounded-full bg-white p-1 shadow hover:bg-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5 text-gray-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582'
                />
              </svg>
            </div>
          </Popover>
        </div>
      </div>

      {/* Info */}
      <div className='px-4 py-3 text-center space-y-1'>
        <h3 className='text-sm font-semibold text-gray-800 truncate'>Nguyễn Tấn Thành</h3>
        <p className='text-xs text-gray-500'>
          🗓️ <span className='font-medium text-gray-700'>20/09/2025</span>
        </p>
        <p className='text-xs text-gray-500'>
          📞 <span className='font-medium text-gray-700'>0333 657 671</span>
        </p>
        <Link
          to={`${path.home}${generateNameId({
            name: product.name,
            id: product._id
          })}`}
          className='mt-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-orange-600'
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}
