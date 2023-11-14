import "regenerator-runtime/runtime";
import "intro.js/introjs.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import AppProvider from "../providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
