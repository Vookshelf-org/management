import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import Link, { LinkProps } from 'next/link'
import React from 'react'

import PlaceholderA5 from '~/assets/placeholders/A5.png'
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
        <a className={classnames('absolute', 'inset-0', 'z-20')}></a>
      </Link>
      <div
        className={classnames(
          'container',
          'relative',
          'flex',
          'h-full',
          'overflow-hidden'
        )}
      >
        {hasCover ? (
          <>
            <img
              className={classnames(
                'object-cover',
                'absolute',
                'w-full',
                'h-full'
              )}
              src={book?.primaryEdition?.coverUrl}
              style={{ filter: 'blur(16px) brightness(1.5)' }}
            />
            <img
              className={classnames('relative', 'self-center', 'z-10')}
              src={book?.primaryEdition?.coverUrl}
            />
          </>
        ) : (
          <div className={classnames('h-full', 'bg-white', 'relative')}>
            <img src={PlaceholderA5} className={classnames('invisible')} />
            <div
              className={classnames(
                'absolute',
                'inset-0',
                'flex',
                'justify-center',
                'items-center'
              )}
            >
              <FontAwesomeIcon
                icon={faImage}
                size="2x"
                className={classnames('text-gray-300')}
              />
            </div>
          </div>
        )}
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
