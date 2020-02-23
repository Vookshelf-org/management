import React from 'react'

import { AppProps } from 'next/app'

import fetch from 'isomorphic-fetch'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import '~/i18n'

import '~/styles/tailwind.css'

import Header from '~/components/Header/Header'

function createClient(initialState?: NormalizedCacheObject) {
  return new ApolloClient({
    connectToDevTools: !!process.browser,
    link: new HttpLink({
      uri: 'http://localhost:4000/',
      credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

const client = createClient()

export default ({ Component, pageProps }: AppProps) => (
  <>
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  </>
)
