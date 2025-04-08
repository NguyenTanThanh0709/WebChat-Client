import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import moment from "moment";
import { AiFillStar } from 'react-icons/ai'
import { CiFilter } from 'react-icons/ci'
import { TfiMenuAlt } from 'react-icons/tfi'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'

import { AuthSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import omit from 'lodash/omit'
import dayjs from 'dayjs'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'


interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
/*
 * Rules validate for form
 * If have price_min and price_max, price_min must be less than price_max
 * If have price min can haven't price max and vice versa
 */
// type FormData = {
//   price_min: string
//   price_max: string
// }
type FormData = NoUndefinedField<Pick<QueryConfig, 'price_min' | 'price_max'>>
/*
 * 1. pick only price_min and price_max
 * 2. use yupResolver to validate
 * 3. use shouldFocusError: false to prevent focus on error
 * 4. use trigger to trigger validation
 * 5. use handleSubmit to handle submit
 * 6. use navigate to navigate to new url with new query params
 * 7. use createSearchParams to create new query params
 * 8. use path.home to get home path
 * 9. use queryConfig to get current query params
 */
const priceSchema = AuthSchema.pick(['price_min', 'price_max'])
export default function AsideFilter({ categories, queryConfig }: Props) {
  const { t } = useTranslation('home')
  const { category1 } = queryConfig
  const {
    control,
    trigger,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })



  // Default data for recipient user, latest message, and notifications
  const recipientUser = {
    _id: '12345',
    name: 'John Doe',
    avatar: 'https://www.w3schools.com/w3images/avatar2.png'
  }

  const latestMessage = {
    text: 'Hey! How are you?',
    createdAt: new Date()
  }

  const thisUserNotifications = [
    { senderId: '12345', text: 'New message from John', read: false, createdAt: new Date() }
  ]

  const isOnline = true // Set to true or false based on your logic

  const truncateText = (text: string): string => {
    let shortText = text.substring(0, 20)
    if (text.length > 20) {
      shortText += '...'
    }
    return shortText
  }


  return (
    <div className='fixed left-[16rem] top-[8rem] z-20 h-[calc(100vh-8rem)] w-[400px] overflow-y-auto rounded-sm border-2 bg-white p-4 shadow-md'>
      <Link to={path.home} className=' flex items-center font-bold'>
        <TfiMenuAlt className='mr-3 h-4 w-3 fill-current' />
        KẾT QUẢ BỘ LỌC
      </Link>
      <div className='mt-4 mb-2 h-[1px] bg-gray-300' />
      <ul className='pl-2'>
      {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category1
          return (
            <li key={categoryItem._id} className='py-2'>
              <Link
                to={{
                  pathname: path.home,
                  // when we use searchParams, we need to convert it to string and
                  // spread properties of queryConfig( it have query params exits)
                  search: createSearchParams({
                    ...queryConfig,
                    category1: categoryItem._id
                  }).toString()
                }}
                className={clsx('relative flex items-center px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='tp[-1 absolute left-[-10px] mr-2 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
<div className="flex items-center justify-between m-2 hover:bg-gray-200 bg-lime-50 p-2">
  <div className="flex items-center space-x-2">
    <img src={recipientUser.avatar} height="35px" alt="user-avatar" className="rounded-full w-[15%]" />
    <div className="text-sm">
      <div className="font-semibold text-gray-800">{recipientUser.name}</div>
      <div className="text-gray-500 text-xs">
        {latestMessage.text && <span>{truncateText(latestMessage.text)}</span>}
      </div>
    </div>
  </div>
  
  <div className="flex flex-col items-end space-y-1">
    <div className="text-xs text-gray-400">
      2024/09/21 12:20
    </div>
    
    <div className={thisUserNotifications.length > 0 ? 'bg-red-500 text-white rounded-full px-2 py-1 text-xs' : ''}>
      {thisUserNotifications.length > 0 ? thisUserNotifications.length : ''}
    </div>
    
    <span className={isOnline ? 'bg-green-500 w-2.5 h-2.5 rounded-full' : ''}></span>
  </div>
</div>



              </Link>
            </li>
          )
        })}
      </ul>

    </div>
  )
}
