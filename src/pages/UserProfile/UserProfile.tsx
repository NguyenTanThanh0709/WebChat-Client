import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserProfile() {
    const profile = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0987654321',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        avatar: 'https://i.pravatar.cc/300', // ảnh demo
        date_of_birth: '1995-06-15T00:00:00.000Z'
      }
    
      return (
        <div className='max-w-5xl mx-auto px-4 py-8'>
        <div className='bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-10'>
          {/* Avatar Section */}
          <div className='flex flex-col items-center md:w-1/3'>
            <div className='w-36 h-36 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden'>
              <img src={profile.avatar} alt='avatar' className='w-full h-full object-cover' />
            </div>
            <div className='mt-4 text-2xl font-bold text-blue-700'>{profile.name}</div>
            <div className='text-sm text-gray-600'>{profile.email}</div>
  
            {/* Action Buttons */}
            <div className='mt-6 flex gap-4'>
              <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow transition'>
                Kết bạn
              </button>
              <button className='bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow transition'>
                Nhắn tin
              </button>
            </div>
          </div>
  
          {/* Info Section */}
          <div className='md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition'>
              <div className='text-gray-500 text-sm'>Số điện thoại</div>
              <div className='text-base font-semibold text-gray-800'>{profile.phone}</div>
            </div>
            <div className='bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition'>
              <div className='text-gray-500 text-sm'>Ngày sinh</div>
              <div className='text-base font-semibold text-gray-800'>
                {new Date(profile.date_of_birth).toLocaleDateString()}
              </div>
            </div>
            <div className='bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition sm:col-span-2'>
              <div className='text-gray-500 text-sm'>Địa chỉ</div>
              <div className='text-base font-semibold text-gray-800'>{profile.address}</div>
            </div>
          </div>
        </div>
      </div>
      )
}
