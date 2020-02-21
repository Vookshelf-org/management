import React from 'react'

import { AppProps } from 'next/app'

import '../styles/tailwind.css'

export default ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
  </>
)
