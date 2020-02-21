import React from 'react'

import { AppProps } from 'next/app'

import fetch from 'node-fetch'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import '../styles/tailwind.css'

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
      <Component {...pageProps} />
    </ApolloProvider>
  </>
)
