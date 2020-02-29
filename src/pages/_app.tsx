import '~/i18n'
import '~/styles/tailwind.css'

import { ApolloProvider } from '@apollo/react-hooks'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
} from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { AppProps } from 'next/app'
import React from 'react'

import Header from '~/components/Header/Header'
import introspectionQueryResultData from '~/types/fragment.json'

function createClient(initialState?: NormalizedCacheObject) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  return new ApolloClient({
    connectToDevTools: !!process.browser,
    link: new HttpLink({
      uri: 'http://localhost:4000/',
      credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
  })
}

const client = createClient()

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  </>
)

export default App
