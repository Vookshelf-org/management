import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Authors from './Authors'
import Series from './Series'

import PlaceholderA5 from '~/assets/placeholders/A5.png'
import CoverArtPlaceHolder from '~/components/CoverArtPlaceholder'
import * as QueryType from '~/types/queries'

export type ContainerProps = {
  className?: string
  book: QueryType.GetBookQuery['book']
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, book }) => {
  const { t } = useTranslation()

  return (
    <div className={classnames(className, 'container', 'mx-auto', 'flex')}>
      <CoverArtPlaceHolder
        src={book.primaryEdition?.coverUrl}
        className={classnames('mr-8')}
        placeholderClassName={classnames('w-64')}
      />
      <div className={classnames('flex-grow')}>
        <h1
          className={classnames(
            'w-full',
            'text-3xl',
            'font-bold',
            'text-black',
            'select-all',
            'mb-2'
          )}
        >
          {book.title}
        </h1>
        <Authors
          connections={book.authorConnections}
          className={classnames('mb-2')}
        />
        <Series connections={book.seriesConnections} />
      </div>
    </div>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
