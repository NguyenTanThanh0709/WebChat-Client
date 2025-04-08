import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
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
export default function AsideFilter({ categories, queryConfig }: Props) {
  const { t } = useTranslation('home')
  const { category } = queryConfig
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
    shouldFocusError: false
  })
  return (
    <div className='fixed left-0 top-[8rem] z-20 h-[calc(100vh-8rem)] w-[260px] rounded-sm border-2 bg-white p-4 shadow-md'>
      <Link to={path.home} className=' flex items-center font-bold'>
        <TfiMenuAlt className='mr-3 h-4 w-3 fill-current' />
        {t('aside filter.all categories')}
      </Link>
      <div className='mt-4 mb-2 h-[1px] bg-gray-300' />
      <ul className='pl-2'>
        {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category
          return (
            <li key={categoryItem._id} className='py-2'>
              <Link
                to={{
                  pathname: path.home,
                  // when we use searchParams, we need to convert it to string and
                  // spread properties of queryConfig( it have query params exits)
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
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
                <span>{categoryItem.icon} {categoryItem.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>

    </div>
  )
}
