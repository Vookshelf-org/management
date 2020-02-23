import React, { useState, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

import Link from 'next/link'

import TableData from './TableData'

import * as QueryTypes from '../../../types/queries'
import ColumnLink from './ColumnLink'

import AuthorsBalloon from './AuthorsBalloon'

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
      {authors.slice(0, limit).map(({ id, name }) => (
        <ColumnLink
          key={id}
          className={classnames('whitespace-no-wrap', 'mr-1')}
          link={{ href: '/author/[id]', as: `/author/${id}` }}
        >
          {name}
        </ColumnLink>
      ))}
      {authors.length > limit && (
        <span
          className={classnames('etc', 'relative', 'p-1', 'cursor-pointer')}
        >
          <span className={classnames('text-blue-500', 'text-sm')}>
            {t('common:etc')}
          </span>
          <AuthorsBalloon
            className={classnames(
              'etc-balloon',
              'absolute',
              'left-0',
              'top-100'
            )}
            authors={authors.slice(limit)}
          />
        </span>
      )}
    </TableData>
  )
}

const StyledComponent: typeof Component = styled(Component)`
  .etc:not(:hover) .etc-balloon:not(:hover) {
    visibility: hidden;
  }
`

const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent {...props} />
}
export default Container