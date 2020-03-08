import { useQuery } from '@apollo/react-hooks'
import classnames from 'classnames'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Series from '~/components/AuthorPage/Series/Series'
import Book from '~/components/BooksList/Covers/Book'
import { getAuthor } from '~/queries/authors'
import * as QueryType from '~/types/queries'

export type Props = { className?: string }

const Page: NextPage<Props> = ({ className }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { id } = router.query

  const { data } = useQuery<
    QueryType.GetAuthorQuery,
    QueryType.GetAuthorQueryVariables
  >(getAuthor, {
    variables: { id: String(id) },
  })
  return (
    <>
      <Head>
        <title>
          {t('title.author', { name: data?.author.name || t('title.loading') })}
        </title>
      </Head>
      <main className={classnames(className)}>
        <div className={classnames('container', 'mx-auto')}>
          <h1
            className={classnames(
              'text-4xl',
              'font-bold',
              'text-black',
              'mb-4'
            )}
          >
            {data?.author.name}
          </h1>
          {data?.author.aliases.length > 0 && (
            <div
              className={classnames(
                'container',
                'mx-auto',
                'mb-4',
                'flex',
                'items-center'
              )}
            >
              <span className={classnames('mr-2', 'text-gray-600')}>
                {t('common:alias')}
              </span>
              <p className={classnames('text-gray-600')}>
                {data?.author.aliases.map(({ name }, i, { length }) => (
                  <span key={i}>
                    <span className={classnames('text-lg', 'text-black')}>
                      {name}
                    </span>
                    {i === length && ','}
                  </span>
                ))}
              </p>
            </div>
          )}
          <div
            className={classnames(
              'mb-8',
              'grid',
              'col-gap-4',
              'row-gap-4',
              'grid-cols-2',
              'sm:grid-cols-3',
              'md:grid-cols-4',
              'lg:grid-cols-6',
              'xl:grid-cols-8'
            )}
          >
            {data?.author.bookConnections.map(({ book }) => (
              <Book book={book} key={book.id} />
            ))}
          </div>
          {data?.author.name && (
            <h2 className={classnames('text-2xl', 'mb-4')}>
              {t('page.author.series', { author: data?.author.name })}
            </h2>
          )}
          {data?.author.relatedSeries.map((series, i, { length }) => (
            <Series
              key={i}
              series={series}
              className={classnames({ 'mb-8': i + 1 !== length })}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Page
