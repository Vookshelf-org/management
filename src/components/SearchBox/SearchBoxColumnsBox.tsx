import classnames from 'classnames'
import React from 'react'

import Column from './SearchBoxColumn'

export type ContainerProps = {
  className?: string
  columns: typeof Column[]
}
export type Props = {} & ContainerProps

const Component: React.FC<Props> = ({ className, children, columns }) => (
  <>
    {columns.length !== 0 && (
      <li
        className={classnames(
          className,
          'px-4',
          'py-2',
          'bg-white',
          'relative',
          'flex'
        )}
      >
        <div className={classnames('py-2', 'w-1/5')}>{children}</div>
        <ul className={classnames('flex-grow')}>{columns}</ul>
      </li>
    )}
  </>
)

const SearchBoxColumn: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default SearchBoxColumn
