import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import Column from './SearchBoxColumn'

type Props = {
  className?: string
  viewColumns: boolean
  loading: boolean
  columns: typeof Column[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
type ContainerProps = {
  search: (
    input: string
  ) => {
    loading: boolean
    columns: typeof Column[]
  }
}

const Component: React.FC<Props> = ({
  className,
  handleChange,
  loading,
  viewColumns,
  columns,
}) => (
  <div className={classnames(className, 'flex')}>
    <div className={classnames('relative')}>
      <input
        type="text"
        className={classnames('bg-gray-300')}
        placeholder="Search"
        onChange={handleChange}
      />
      {viewColumns && (
        <ul
          className={classnames('absolute', 'top-100', 'left-0', 'min-w-full')}
        >
          {loading ? (
            <Column>
              <p> Loading</p>
            </Column>
          ) : columns.length === 0 ? (
            <Column>
              <p> Not Found</p>
            </Column>
          ) : (
            <>{columns}</>
          )}
        </ul>
      )}
    </div>
  </div>
)

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
