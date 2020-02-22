import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useTranslation } from 'react-i18next'

import { getAuthor } from '../../queries/authors'
import * as QueryType from '../../types/queries'

import BooksListTable from '../../components/BooksList/Table/Table'

import classnames from 'classnames'
import { useMemo } from 'react'

interface Props {}

const Page: NextPage<Props> = props => {
  const router = useRouter()
  const { id } = router.query

  const { t } = useTranslation()

  const { loading, data } = useQuery<
    QueryType.GetAuthorQuery,
    QueryType.GetAuthorQueryVariables
  >(getAuthor, {
    variables: { id: Number(id) },
  })

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
  )

  return (
    <main className={classnames()}>
      <div className={classnames('container', 'mx-auto', 'py-6')}>
        <h1 className={classnames('text-2xl', 'font-bold')}>
          {data?.author.name}
        </h1>
        <BooksListTable data={listData} className={classnames('w-full')} />
      </div>
    </main>
  )
}

export default Page
