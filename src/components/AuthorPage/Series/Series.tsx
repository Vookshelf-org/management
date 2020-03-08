import classnames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import List from './SeriesList'

import * as QueryType from '~/types/queries'

export type ContainerProps = {
  className?: string
  series: QueryType.GetAuthorQuery['author']['relatedSeries'][number]
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, series }) => {
  const { t } = useTranslation()
  return (
    <div className={classnames(className)}>
      <Link href="/series/[id]" as={`/series/${series.id}`}>
        <a>
          <h3 className={classnames('text-xl', 'mb-2', 'select-all')}>
            {series.title}
          </h3>
        </a>
      </Link>
      <List className={classnames()} connections={series.bookConnections} />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default Container
