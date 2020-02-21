import React, { useState } from 'react'
import classnames from 'classnames'

type Props = {
  className?: string
}
type ContainerProps = {}

const Component: React.FC<Props> = ({ className, children }) => (
  <li className={classnames(className, 'px-4', 'py-2', 'bg-white')}>
    {children}
  </li>
)

const SearchBoxColumn: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default SearchBoxColumn
