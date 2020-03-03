import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  className?: string
  userAgent?: string
}

const Page: NextPage<Props> = props => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('title.index')}</title>
      </Head>
      <main {...props}></main>
    </>
  )
}
export default Page
