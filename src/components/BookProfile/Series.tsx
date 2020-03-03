import classnames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as QueryType from '~/types/queries'

export type ContainerProps = {
  className?: string
  connections: QueryType.GetBookQuery['book']['seriesConnections']
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, connections }) => {
  const { t } = useTranslation()
  return (
    <div className={classnames(className)}>
      <span className={classnames('text-gray-600', 'text-sm', 'select-none')}>
        {t('common:series')}
      </span>
      <div className={classnames('inline-block')}>
        {connections.map(({ series: { id: seriesId, title }, volume }) => (
          <p key={seriesId} className={classnames('align-bottom')}>
            <Link href="/series/[id]" as={`/series/${seriesId}`}>
              <a className={classnames('ml-1', 'text-black', 'text-lg')}>
                {title} {t('common:volume', { context: 'series', volume })}
              </a>
            </Link>
          </p>
        ))}
      </div>
    </div>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
