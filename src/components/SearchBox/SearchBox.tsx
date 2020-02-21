import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import { useTranslation } from 'react-i18next'

import Column from './SearchBoxColumn'

type ContainerProps = {
  placeholder: string
  search: (
    input: string
  ) => {
    loading: boolean
    columns: typeof Column[]
  }
}
type Props = {
  className?: string
  viewColumns: boolean
  loading: boolean
  columns: typeof Column[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} & ContainerProps

const Component: React.FC<Props> = ({
  className,
  handleChange,
  loading,
  viewColumns,
  columns,
  placeholder,
}) => {
  const { t } = useTranslation()
  return (
    <div className={classnames(className, 'flex')}>
      <div className={classnames('relative')}>
        <input
          type="text"
          className={classnames(
            'bg-gray-300',
            'px-4',
            'py-2',
            'rounded-md',
            'outline-none'
          )}
          placeholder={t(placeholder)}
          onChange={handleChange}
        />
        {viewColumns && (
          <ul
            className={classnames(
              'absolute',
              'top-100',
              'left-0',
              'min-w-full',
              'shadow',
              'rounded-md'
            )}
          >
            {loading ? (
              <Column>
                <p>{t('common:searching')}</p>
              </Column>
            ) : columns.length === 0 ? (
              <Column>
                <p>{t('common:no-result')}</p>
              </Column>
            ) : (
              <>{columns}</>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

const SearchBox: React.FC<ContainerProps> = props => {
  const [input, setInput] = useState('')

  const { loading, columns } = props.search(input)

  return (
    <Component
      {...props}
      loading={loading}
      columns={columns}
      viewColumns={!!input}
      handleChange={event => {
        setInput(event.target.value)
      }}
    />
  )
}

export default SearchBox
