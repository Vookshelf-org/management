import { useQuery } from "@apollo/react-hooks"
import classnames from "classnames"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import BookProfile from "~/components/BookProfile"
import getBooks from "~/queries/getBook"
import * as QueryType from "~/types/queries"

interface Props {
  className?: string
  userAgent?: string
}

const Page: NextPage<Props> = ({ className }) => {
  const router = useRouter()
  const { id } = router.query
  const { t } = useTranslation()

  const { loading, data } = useQuery<
    QueryType.GetBookQuery,
    QueryType.GetBookQueryVariables
  >(getBooks, {
    variables: { id: String(id) },
  })

  return (
    <>
      <Head>
        <title>
          {t("title.book", { title: data?.book.title || t("title.loading") })}
        </title>
      </Head>
      <main className={classnames(className)}>
        {data?.book && <BookProfile book={data?.book} />}
      </main>
    </>
  )
}

export default Page
