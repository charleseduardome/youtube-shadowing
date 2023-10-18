import "regenerator-runtime/runtime";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'

import AppProvider from '../providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}
