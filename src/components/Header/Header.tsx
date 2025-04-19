import { AiOutlineBell } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
// import purchaseApi from 'src/apis/purchase.api'
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

  // when us direct then header just re-render
  // not unmount - mount again
  // except of course case logout then jump to RegisterLayout comback in case
  // should queries not have inactive => not call again > unecessary set stale: infinity
  // const { data: purchasesInCartData } = useQuery({
  //   queryKey: ['purchases', { status: purchasesStatus.inCart }],
  //   queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
  //   // explain : here, we don't want to call api when user is not authenticated
  //   enabled: isAuthenticated
  // })
  // const purchasesInCart = purchasesInCartData?.data?.data

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
                placeholder='TÌM KIẾM NGƯỜI DÙNG THEO SỐ ĐIỆN THOẠI'
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
          {/* <div className='col-span-1 justify-self-end'>
            <Popover
              placement='bottom-end'
              renderPopover={
                <div className='relative  max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Thông báo mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAeAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAHAAIEBQYDAQj/xAA5EAABAwIDBQUHAwMFAQAAAAABAAIDBBEFEiEGMUFRYQcTIjJxFCOBkaGxwVLR4RVCQzNywvDxJP/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBAEA/8QAIBEAAgMAAwADAQEAAAAAAAAAAAECAxESITEiMlFBE//aAAwDAQACEQMRAD8AIbU4JrU5KCGy/wCm70QZ26xZ8lTLh9PJ7trrTEf3H9KJu2WL/wBFwKepaR3z/dQg/rPH4AE/BBKQF4c9xLnPvqeZ4rsCTwpzES8pGKzgwC7vspsjRGHO320Hqr7ZnAnTkVEw0JuF0pqKChDk8KSmwSSZt3h3RT6fZiYkF1mt5WRIpMKhZFfKLryaiaL5QpnbIqjVAwJ2eyCwIPqFT4lRyQOu5ug5IjzQ5TuVHjFK2RhsLFbGxnTqjnRhHO5Indm2P+3UrsNqn3qKdoMbifPHut6j7EIa4hAYJXDgdyfgdfJhmKU9ZFcvidmsOI4j4i4VDXJEn1Z9ANIK8kOuiiwTioginpnB0UrA9jhxBFwu7GvPickDRztwuvUnm1l6uOLZqemNTnbtdyeTgt7VcSM+MUuHsd4KaPvHjm5275C3zWLY4F3QaBdsdrnV+NYhWuN+8lJB6DQfQBVZqCzXkLLTSU2J9XXwwQxmS7tWtW3pp8Rw6IF+GXhaB5TuVDsp3VFA+vqzkDtBcq6ftXQkH3vhBtfh80icteYVVxxa2X2H4xFWgRiF8TuR1CnTRkNuqTCa2Cre2RgYTwIVvXzOZEGj+7RJbQ1Iq6qaNjiHuaDyJUCYRyjzNPxSxHC4agl80hDuWZVb8NiaP/nqXg9SCtSRr5FRtNQ2gMrBuNysrex0W9rYpZaKSOfKSBa44rBTDu3Fp4GypqfWEly70LnZjiPtWCvpHuu+lfZv+w6j63W1zEs1Qg7Mq72fHWwE+Gpic23MjX7AovO8nqgmsZ0fDnnHFJNZGL70kIRdtXHEZO6oKmS9skTj9F2aqna6b2fZjFZb2IpJA31IIH1ITycAbn2hcf1LhQ076+uhpowS6V4CVQ+0YC0nZrRtlxaWpkFzDH4fUn+F0nkdDgtkkbWPZun9jZA9l2taNFW1+yFLKBkMjHNBaC3ly9FtQLsHoo8g/VuUik14WtJmZwPBnUErn3Ja43A3AHopuLTuD4jusbK3c6JosCCeSo8dcMuvAoX2aUON4ZitVNJJDK4MzNMbWusC3jfjc9FSsoMYo3MIcZHjzgnQ+iIeGu7ykjzai2hTammjFzZHz6wHgt0zbA99OTKwtJG4oeV4vUyAfrP3RQrQGsdlQwqL98+/FxP1Taf6IvXSLDZ+pNDiVDUjTu52k+h0P0R6aQ5nWy+eG6RHUo84NVNqsLpZmjSSJr7+oCKz9AgSwkmZ7m1l4ljC9Cy/abP3OxtZb/I+OP5uH7LUBYHtjn7vAaCAG3eVoJHMBj/yQnkwH6o3IHDktj2ZSWqaxvMN/KxlQfGPRazs1eBiVVHxLA76rLfoxlX3QVGygNUKqfJUP7qLQcSnTOLWEhV0WMU8VQ6Jzu7a3e94IaT6qJFw81M9HM1kdFM4N80oAIH1+ypMXxRlVNkeHC+h0+60BxmieC1tTG8nTQqpxCropZMmeJzvgiw7H+EjZyoDqURE3DTYHople4MB4qlp6mKHN3VhbW1l2q6p0jAQNCFjORXYrUd1TzP5NNvVDuoJMgzaOtYrZ45MGUjjJu6fP7BYmocTUP36OI1FiqaUS3s6k2jRo2FnEuy9Fa5yNLLnoSgo8+AIudmk2bZ3IDqyVwPx1/IR2eCoemrFidySZn8dikkjcLvghn2yy+5wuLnI93yAH5KJR8qFvbG7NXYZED5Ynut6kD8KgnBrONVY7M4gMMxinqXm0Z93Iehtr87KBILg9AmM8i1rVhqePQ5MeJoxlN78U40rHQZHNBHohxshtY6kyUVfcxjSOXkOR/dEqkrIpo2va4OaRwUMoOLxl0J8lqKCuw5g/wALX9SNfmqOrwmN7zeNoB6Le1D4Txseqo657A4gEHmu0f8A6yawp8Jw2nik8m4bypVdUMHgZYNaFGnrWQghp3rOYxiju5eIt/E8lyTkxMpJIgbSYh7RVCmjd4GNdmI4nKQqQkkkrxoL3k3Nzcpx3K6K4rCCUuT0e11xdFHsvObDapl9e8a75i34Qqa6wRH7LKn3lTBmA8Lf+SGzw2HoQHssdTqvU6Tza814px5dlCbtYkD8ep2cWU4v8XO/ZFaaQRsLjuGt0Cts8RNbjs9RJcB7vADwaBYKknKGUAOK5NFjbmvHy+Mr1niN1pw2BvvgthgFRUshywylrmm1uBWRa7u3gcS5a7BG+Np/Uk3eDqfS2diVZulJv0USerlIOpJVu+mJFst1Dno3DUNKl0rKCWOSV3iJtxVNjJETWxt4rUVQELCXC2ixlfUe01Dnf2t0CfT2ye54jhTgmUAWHBNkPBdIHiORryL2IKY1ucgaKolwYFp9icQbQYm0v070hlzwv/Nln3MZGcua9uK7U5B0FjqCLoZGx6Du2oErGv5hJUWyWI/1DDInPN3s8EhPNJTPooJfaJtD/RI4InRmRlS0gjMQLDqPVBfEKx9XVyTvtmkJJy7hdHnEIcJ2uoHYfWWEnmYRo5jubT+ED9pcCqtn8VkoaoaA3jktpI3mFUiYqyTdPZIWtIXNegaIjCSx2d7OYW0wIAtZzssbQRmSXotrgbfextG9T3eFFJrYYszR4uCe+kGW902DM3QqYxjnsUZWYvbMGmwt79MzyGtt1/hD+NnhKJe39LbDIZLXDZBm6f8AboeWAcbEaqyj6kd3ciOWnMeQK8eMt0+Q29Ex7y4btOaeJZx1KmYbA+snEMckTCRe8jrD/wBXCmp5KqoZBCAXvNhc2HzXeSgkjqJYYyJnRDxOi8QHxG9c8MQQ9joZKetq4oZDJTlwBePKXWOv0+oSVPgW0VVhULZmBkmHhzRJBJM18wNvM3cbX53SSJQejlNYdq3aI0QjkggkJd4o3uOUHqOKgY/tXV47hgjr5x3rX2ZDHCA0Nt5i46k30skkmp8lol9MyuRxBcAcvOy6+x1IOUwvb6iy9SWOWDIR5E+iiMABO/itTs/dpEshtrovUlPN6U1rDTxTGeQAaAbyrOI6AJJJA5kLHzQxYTUS4mbU2WzhxceAHUlByaZzxkGkYcXMbpcfHjySSVdC+Okdz+WD546c0UcsVTee+V8DmEEdQdxH1UVlmOaZASwOFwOSSSoQg7up++bPPBHanjI0J3XNgrHCxJFhGKTMrooBljYYXWzzanRtxfnuSSQe9HedkSkoqmtz+zwul7sZnWtoEkkkmy5xlgyME0f/2Q=='
                                alt={purchase.product.name}
                                className="h-12 w-12 object-cover rounded-full"
                              />
                            </div>
                            <div className="ml-3 flex-grow overflow-hidden">
                              <div className="text-sm font-medium truncate text-gray-800">
                              Nguyễn Tấn Thành sent you message
                              </div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-orange'>2025/03/20 12:03</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASES && (
                              <span>{purchasesInCart.length - MAX_PURCHASES} more marked as read</span>
                            )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                      <div className='mt-3 capitalize'>Chưa có thông báo</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
              <AiOutlineBell className='w-8 h-8 text-orange' />
                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className='absolute top-[-5px] right-[-10px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange '>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div> */}
        </div>
      </div>
    </div>
  )
}
