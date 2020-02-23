import React, { useState, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

import Link, { LinkProps } from 'next/link'
import { useTranslation } from 'react-i18next'

import ColumnLink from './ColumnLink'
import * as QueryTypes from '../../../types/queries'

import TableData from './TableData'
import AuthorsTableData from './Authors'

export type ContainerProps = {
  className?: string
  data: Data[]
}
export type Props = {} & ContainerProps

interface Data {
  book: Pick<QueryTypes.Book, 'id' | 'title' | 'volume'>
  authors: Pick<QueryTypes.Author, 'id' | 'name'>[]
  series?: Pick<QueryTypes.Series, 'id' | 'title'>
}

export const Component: React.FC<Props> = ({ className, data }) => {
  const { t } = useTranslation()
  return (
    <table
      className={classnames(
        className,
        'border',
        'border-2',
        'border-gray-300',
        'border-collapse'
      )}
    >
      <thead>
        <tr>
          <th className={classnames('py-2', 'border', 'border-gray-300')}>
            {t('common:title')}
          </th>
          <th className={classnames('py-2', 'border', 'border-gray-300')}>
            {t('common:author')}
          </th>
          <th className={classnames('py-2', 'border', 'border-gray-300')}>
            {t('common:series')}
          </th>
          <th className={classnames('py-2', 'border', 'border-gray-300')}>
            {t('common:volume')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ book, series, authors }, i) => (
          <tr
            key={book.id}
            className={classnames(i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200')}
          >
            <TableData className={classnames('text-left')}>
              <ColumnLink link={{ href: '/book/[id]', as: `/book/${book.id}` }}>
                {book.title}
              </ColumnLink>
            </TableData>
            <AuthorsTableData authors={authors} />
            <TableData className={classnames('text-left')}>
              {series?.title && (
                <ColumnLink
                  link={{ href: '/series/[id]', as: `/series/${book.id}` }}
                >
                  {series.title}
                </ColumnLink>
              )}
            </TableData>
            <TableData className={classnames('text-center')}>
              {book.volume}
            </TableData>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
