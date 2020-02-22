import React, { useState, useEffect, useMemo } from 'react'
import classnames from 'classnames'

import Link from 'next/link'

import TableData from './TableData'

import * as QueryTypes from '../../../types/queries'
import { useTranslation } from 'react-i18next'

export type ContainerProps = {
  className?: string
  authors: Pick<QueryTypes.Author, 'id' | 'name'>[]
  limit?: number
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({
  className,
  authors,
  limit = 3,
}) => {
  const { t } = useTranslation()
  return (
    <TableData className={classnames(className)}>
      <p className={classnames({ '-mr-1': authors.length <= limit })}>
        {authors.slice(0, limit).map(({ id, name }) => (
          <Link key={id} href="/author/[id]" as={`/author/${id}`}>
            <a
              className={classnames(
                'py-1',
                'px-2',
                'mr-1',
                'hover:bg-blue-200',
                'whitespace-no-wrap',
                'rounded'
              )}
            >
              {name}
            </a>
          </Link>
        ))}
        {authors.length > limit && (
          <span className={classnames('text-blue-500', 'text-sm')}>
            {t('common:etc')}
          </span>
        )}
      </p>
    </TableData>
  )
}

const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}
export default Container
