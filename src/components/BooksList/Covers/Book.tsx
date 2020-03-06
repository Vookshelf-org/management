import classnames from 'classnames'
import Link from 'next/link'
import React from 'react'

import CoverArt from '~/components/CoverArtPlaceholder'
import * as QueryType from '~/types/queries'

export type ContainerProps = {
  className?: string
  book: Pick<QueryType.Book, 'id' | 'title' | 'primaryEdition'>
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, book }) => {
  const url = book?.primaryEdition?.coverUrl
  const hasCover = !!url
  return (
    <div
      className={classnames(
        className,
        'bg-white',
        'shadow',
        'p-2',
        'rounded',
        'relative'
      )}
    >
      <Link href={'/book/[id]'} as={`/book/${book.id}`}>
        <a className={classnames('absolute', 'inset-0', 'z-20')} />
      </Link>
      <div className={classnames('container', 'relative', 'overflow-hidden')}>
        <CoverArt src={url} />
        {!hasCover && (
          <div className={classnames('absolute', 'inset-0')}>
            <p className={classnames('text-black', 'text-sm', 'text-center')}>
              {book.title}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default Container
