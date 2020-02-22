import React, { useState, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

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

export const LongSentence: React.FC<{ className?: string }> = ({
  className,
}) => (
  <>
    <p className={classnames(className)}></p>
  </>
)

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
              <Link href="/book/[id]" as={`/book/${book.id}`}>
                <a
                  className={classnames(
                    'py-1',
                    'px-2',
                    'hover:bg-blue-200',
                    'whitespace-no-wrap',
                    'rounded'
                  )}
                >
                  {book.title}
                </a>
              </Link>
            </TableData>
            <AuthorsTableData authors={authors} />
            <TableData className={classnames('text-left')}>
              {series?.title && (
                <Link href="/series/[id]" as={`/series/${series.id}`}>
                  <a
                    className={classnames(
                      'py-1',
                      'px-2',
                      'hover:bg-blue-200',
                      'whitespace-no-wrap',
                      'rounded'
                    )}
                  >
                    {series.title}
                  </a>
                </Link>
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
