import { AiOutlineBell } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import noproduct from 'src/assets/images/no-product.png'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useSearchProduct from 'src/hooks/useSearchProduct'
import { formatCurrency, getAvatarUrl } from 'src/utils/utils'
import Popover from '../Popover'
import { locales } from 'src/i18n/i18n'
import { useTranslation } from 'react-i18next'

const MAX_PURCHASES = 5
export default function Header() {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const { register, onSubmitSearch } = useSearchProduct()
  const queryClient = useQueryClient()



  const logoutMutation = useMutation(authApi.logoutAccount)
  // handle logout mutate
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
        setProfile(null)
        toast.success('Logout success')
        // case : when logout then remove all queries. if not, although logout but still have data in cache at the Cart
        // The removeQueries method can be used to remove queries from the cache based on their query keys or any other functionally accessible property/state of the query.
        queryClient.removeQueries(['purchases', { status: purchasesStatus.inCart }])
      }
    })
  }
  const changeLanguage = (lng: 'en' | 'vi') => {
    console.log('change')
    i18n.changeLanguage(lng)
  }
  return (
    <div className='sticky top-0 z-20 bg-lime-200  pb-5 pt-2 text-white transition-[transform.2scubic-bezier(.4,0,.2,1)]'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <div className='flex justify-start gap-x-3 text-orange'>
            <p>Chat Center</p>
            <p>Download</p>
            <div className='flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span className='mx-1'>{currentLanguage}</span>
            </div>
          </div>
          <div className='flex justify-end'>
            <Popover
              as={'span'}
              className='relative flex cursor-pointer items-center py-1 hover:text-red-300 text-orange'
              renderPopover={
                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                  <div className='flex flex-col py-2 pl-3 pr-28'>
                    <button className='py-2 px-3 text-left  hover:text-orange' onClick={() => changeLanguage('vi')}>
                      Tiếng Việt
                    </button>
                    <button className='mt-2 py-2 px-3 text-left hover:text-orange' onClick={() => changeLanguage('en')}>
                      English
                    </button>
                  </div>
                </div>
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span className='mx-1'>Vietnamese</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </Popover>
            {isAuthenticated && (
              <Popover
                className='ml-6 text-orange flex cursor-pointer items-center py-1 hover:text-gray-300'
                renderPopover={
                  <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                    <Link to={path.profile} className='block w-full bg-white py-3 px-4 text-left hover:text-cyan-500'>
                      My Account
                    </Link>
                    {/* <Link
                      to={path.historyPurchase}
                      className='block w-full bg-white py-3 px-4 text-left hover:text-cyan-500'
                    >
                      My Purchase
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className='block w-full bg-white py-3 px-4 text-left hover:text-cyan-500'
                    >
                      Logout
                    </button>
                  </div>
                }
              >
                <div className='mr-2 h-5 w-5 flex-shrink-0'>
                  <img
                    src={getAvatarUrl(profile?.avatar)}
                    alt='avatar'
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
                <p>{profile?.email}</p>
              </Popover>
            )}
            {!isAuthenticated && (
              <div className='flex items-center'>
                <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                  Register
                </Link>
                <div className='h-4 border-r-[1px] border-white/40' />
                <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to='/'>
            <svg viewBox='0 0 192 65' className='mt-[-10px] mr-[-80px] h-[42px] fill-orange lg:h-11'>
              <g fillRule='evenodd'>
                <circle cx="30" cy="30" r="28" stroke="orange" stroke-width="2" fill="none" />
                <polygon 
                  points="30,8 48,19 48,41 30,52 12,41 12,19" 
                  fill="rgba(255,165,0,0.1)" 
                  stroke="orange"
                />
                <path 
                  d="M18,40 L22,22 L30,34 L38,22 L42,40" 
                  stroke="orange" 
                  stroke-width="3" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='flex h-[40px] rounded-none bg-white p-1'>
              <input
                placeholder='TÌM KIẾM THEO CHỨC NĂNG ...'
                type='text'
                className='h-[34px] flex-grow border-none bg-transparent p-2 text-black outline-none'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-lime-200 py-2 px-6 hover:opacity-50'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-4 w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
          </div>
        </div>
      </div>
    </div>
  )
}
