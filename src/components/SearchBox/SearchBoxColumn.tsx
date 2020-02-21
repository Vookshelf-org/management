import React, { useState } from 'react'
import classnames from 'classnames'

import Link from 'next/link'

export type ContainerProps = {
  className?: string
  href?: string
}
export type Props = {} & ContainerProps

const Component: React.FC<Props> = ({ className, children, href }) => (
  <li className={classnames(className, 'px-4', 'py-2', 'bg-white', 'relative')}>
    {children}
    {href && (
      <Link href={href}>
        <a
          className={classnames(
            'absolute',
            'top-0',
            'left-0',
            'w-full',
            'h-full'
          )}
        />
      </Link>
    )}
  </li>
)

const SearchBoxColumn: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default SearchBoxColumn
