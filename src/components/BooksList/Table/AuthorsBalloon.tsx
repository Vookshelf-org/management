import React, { useState, useEffect, useMemo } from 'react'
import classnames from 'classnames'

import ColumnLink from './ColumnLink'
import * as Authors from './Authors'

export type ContainerProps = {
  className?: string
  authors: Authors.ContainerProps['authors']
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({
  className,
  children,
  authors,
}) => {
  return (
    <div
      className={classnames(
        className,
        'w-64',
        'bg-white',
        'border',
        'border-gray-300',
        'px-4',
        'py-2',
        'rounded'
      )}
    >
      {authors.map(({ name, id }) => (
        <ColumnLink
          key={id}
          className={classnames('inline-block', 'mb-2')}
          link={{ href: '/author/[id]', as: `/author/${id}` }}
        >
          {name}
        </ColumnLink>
      ))}
    </div>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
