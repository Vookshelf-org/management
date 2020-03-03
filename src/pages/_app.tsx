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
import classnames from 'classnames'
import fetch from 'isomorphic-fetch'
import { AppProps } from 'next/app'
import React from 'react'
import styled from 'styled-components'

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

const App = ({
  Component,
  pageProps,
  className,
}: AppProps & { className?: string }) => (
  <div className={classnames(className, 'overflow-y-scroll')}>
    <ApolloProvider client={client}>
      <Header />
      <Component
        {...pageProps}
        className={classnames('component', 'bg-gray-200')}
      />
    </ApolloProvider>
  </div>
)

const StyledApp = styled(App)`
  > .component {
    min-height: calc(100vh - 4rem);
  }
`

export default StyledApp
