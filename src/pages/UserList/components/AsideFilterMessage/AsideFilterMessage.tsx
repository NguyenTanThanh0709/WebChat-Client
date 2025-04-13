import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { TfiMenuAlt } from 'react-icons/tfi'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { AuthSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<QueryConfig, 'price_min' | 'price_max'>>

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

  // Dummy data
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

  const isOnline = true

  const truncateText = (text: string): string => {
    let shortText = text.substring(0, 20)
    if (text.length > 20) {
      shortText += '...'
    }
    return shortText
  }

  return (
    <div className='fixed left-[16rem] top-[8rem] z-20 h-[calc(100vh-8rem)] w-[400px] overflow-y-auto rounded-sm border-2 bg-white p-4 shadow-md'>
      <Link to={path.home} className='flex items-center font-bold'>
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
                  search: createSearchParams({
                    ...queryConfig,
                    category1: categoryItem._id
                  }).toString()
                }}
                className={clsx('relative flex flex-col space-y-2 px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-2 mr-2 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}

                {/* User Message Card */}
                <div className='flex items-center justify-between rounded-lg p-3 hover:bg-gray-100 transition-all duration-150'>
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>
                      <img
                        src={recipientUser.avatar}
                        alt='user-avatar'
                        className='h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm'
                      />
                      {isOnline && (
                        <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500'></span>
                      )}
                    </div>
                    <div>
                      <div className='font-semibold text-sm text-gray-900'>{recipientUser.name}</div>
                      <div className='text-xs text-gray-500'>{truncateText(latestMessage.text)}</div>
                    </div>
                  </div>

                  <div className='flex flex-col items-end space-y-1'>
                    <div className='text-xs text-gray-400'>
                      {moment(latestMessage.createdAt).format('HH:mm DD/MM')}
                    </div>
                    {thisUserNotifications.length > 0 && (
                      <div className='bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                        {thisUserNotifications.length}
                      </div>
                    )}
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
