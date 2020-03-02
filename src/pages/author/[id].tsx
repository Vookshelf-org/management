import { useQuery } from '@apollo/react-hooks'
import classnames from 'classnames'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import Book from '~/components/BooksList/Covers/Book'
import { getAuthor } from '~/queries/authors'
import * as QueryType from '~/types/queries'

export type Props = { className?: string }

const Page: NextPage<Props> = ({ className }) => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useQuery<
    QueryType.GetAuthorQuery,
    QueryType.GetAuthorQueryVariables
  >(getAuthor, {
    variables: { id: String(id) },
  })

  /*
  const listData = useMemo(
    () =>
      data?.author.books.map(
        ({ id: bookId, title, volume, authors, series }) => ({
          book: { id: bookId, title, volume },
          authors: [
            authors.find(author => author.id === id),
            ...authors.filter(author => author.id !== id),
          ],
          series,
        })
      ) || [],
    [data]
  ) */

  return (
    <main className={classnames(className)}>
      <div className={classnames('container', 'mx-auto', 'py-6')}>
        <h1 className={classnames('text-2xl', 'font-bold')}>
          {data?.author.name}
        </h1>
        <BooksListTable data={listData} className={classnames('w-full')} />
        <div
          className={classnames(
            'grid',
            'gap-5',
            'grid-cols-2',
            'sm:grid-cols-3',
            'md:grid-cols-4',
            'lg:grid-cols-6',
            'xl:grid-cols-7'
          )}
        >
          {data?.author.bookConnections.map(({ book }) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Page

/*
   <div
              key={i}
              className={classnames('p-2', 'rounded', 'shadow-lg', 'bg-white')}
            >
              <div
                className={classnames(
                  'h-full',
                  'flex',
                  'justify-center',
                  'select-none'
                )}
              >
                <img
                  className={classnames('self-center', {
                    'object-cover': !book?.primaryEdition?.coverUrl,
                  })}
                  src={book?.primaryEdition?.coverUrl ?? ImageNoCoverArt}
                />
              </div>
            </div>
*/
