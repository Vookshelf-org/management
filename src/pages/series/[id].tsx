import { useQuery } from "@apollo/react-hooks"
import classnames from "classnames"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"

import Profile from "~/components/SeriesProfile"
import getSeries from "~/queries/getSeries"
import * as QueryType from "~/types/queries"

interface Props {
  className?: string
  userAgent?: string
}

const Page: NextPage<Props> = ({ className }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { id } = router.query

  const { data } = useQuery<
    QueryType.GetSeriesQuery,
    QueryType.GetSeriesQueryVariables
  >(getSeries, {
    variables: { id: String(id) },
  })

  return (
    <>
      <Head>
        <title>
          {t("title.series", {
            title: data?.series.title || t("title.loading"),
          })}
        </title>
      </Head>
      <main className={classnames(className)}>
        {data?.series && <Profile series={data.series} />}
      </main>
    </>
  )
}
export default Page
