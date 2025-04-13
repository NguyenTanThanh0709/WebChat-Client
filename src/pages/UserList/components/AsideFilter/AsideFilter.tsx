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
<div className="fixed left-0 top-[8rem] z-20 h-[calc(100vh-8rem)] w-[260px] rounded-2xl border bg-white p-5 shadow-lg">
    <Link
      to={path.home}
      className="flex items-center gap-2 text-base font-semibold text-gray-800 hover:text-orange transition-colors"
    >
      <TfiMenuAlt className="h-5 w-5" />
      {t('aside filter.all categories')}
    </Link>

    <div className="my-4 h-px w-full bg-gray-200" />

    <ul className="space-y-3">
      {categories.map((categoryItem) => {
        const isActive = categoryItem._id === category
        return (
          <li key={categoryItem._id}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: categoryItem._id
                }).toString()
              }}
              className={clsx(
                'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                {
                  'bg-orange/10 text-orange font-semibold': isActive,
                  'text-gray-700 hover:bg-gray-100 hover:text-orange': !isActive
                }
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-[-50%] rounded-full bg-orange" />
              )}
              <span className="text-base">{categoryItem.icon}</span>
              <span>{categoryItem.name}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
    
  )
}
