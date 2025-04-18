import { useQuery  } from '@tanstack/react-query'
// import productApi from 'src/apis/product.api'
import { useState } from 'react'
// import categoryApi from 'src/apis/categoriest'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { UserTListConfig, UserT as ProductType } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import AsideFilterMessage from './components/AsideFilterMessage'
import AsideFilterMessageGroup from './components/AsideFilterMessageGroup'
import User from './components/User/User'
import SortProductList from './components/SortUserList'
import { Head } from 'src/components/head'
import ChatBox from './components/ChatBox'

export default function UserList() {
  const queryConfig = useQueryConfig()
  // console.log('queryParam', queryParam)
  // Product list use query to get data from server
  // const { data: productsData } = useQuery({
  //   queryKey: ['products', queryConfig],
  //   queryFn: () => {
  //     return productApi.getProducts({} as ProductListConfig)
  //   },
  //   keepPreviousData: true,
  //   staleTime: 3 * 60 * 1000
  // })

  // Product list use query to get data from server
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   }
  // })

  const categoriesDataFEATURE = [
    { _id: '1', name: 'Bạn bè' ,icon:'✅' },
    { _id: '2', name: 'Nhóm', icon:'🎁' },
    { _id: '3', name: 'Tìm kiếm người dùng', icon:'💻' }
  ]

    // ✅ Bắt đầu dùng useState để lưu category đang chọn
    const [selectedCategory, setSelectedCategory] = useState('1')
      // ✅ Hàm xử lý khi người dùng chọn category
  const handleChangeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className='bg-gray-200 py-6'>
      <Head title={'Trang chủ | Shopee Clone'} />
      <div className='container-fluid'>
        <div className=' grid grid-cols-12 gap-6'>
          <div className='col-span-5'>


            <AsideFilter
              categories={categoriesDataFEATURE}
              selectedCategory={selectedCategory}
              onChangeCategory={handleChangeCategory}
            />

            {/* categoriesDataFEATURE có id = 1 thì hiện cái này */}
            {(selectedCategory === '1' || selectedCategory === '3') && (
              <AsideFilterMessage queryConfig={queryConfig} categories={categoriesDataFEATURE || []} />
            )}
            {/* categoriesDataFEATURE có id = 2 thì hiện cái này */}
            {selectedCategory === '2' && (
              <AsideFilterMessageGroup queryConfig={queryConfig} categories={categoriesDataFEATURE || []} />
            )}


          </div>

      {/* Nếu category === '3' thì hiển thị danh sách sản phẩm */}
      {selectedCategory === '3' ? (
  <div>List User</div>

  // productsData && (
  //   <div className='sticky z-10 col-span-7'>
  //     <SortProductList
  //       queryConfig={queryConfig}
  //       pageSize={productsData.data.data.pagination.page_size}
  //     />
  //     <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
  //       {productsData.data.data.products.map((product: ProductType) => (
  //         <div className='col-span-1' key={product._id}>
  //           <User product={product} />
  //         </div>
  //       ))}
  //     </div>
  //     <Pagination
  //       queryConfig={queryConfig}  
  //       pageSize={productsData.data.data.pagination.page_size}
  //     />
  //   </div>

) : (
  <div className='sticky z-10 col-span-7'>
    <ChatBox />
  </div>
)}


        </div>
      </div>
    </div>
  )
}
