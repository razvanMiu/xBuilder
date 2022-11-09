import 'xBuilder/styles/globals.css';
import 'xBuilder/config';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from 'xBuilder/components/theme/Footer/Footer';
import Header from 'xBuilder/components/theme/Header/Header';
import RefreshToken from 'xBuilder/components/theme/RefreshToken/RefreshToken';
import config from 'xBuilder/registry';
import { Provider, useCreateStore } from 'xBuilder/store';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initialStoreState);

  const router = useRouter();
  const canonicalUrl = (
    config.settings.appUrl + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0];

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Provider createStore={createStore}>
        <RefreshToken />
        <Header />
        <div className="main flex-1">
          <Link href={`${router.asPath}/edit`}>Edit</Link>
          <Component {...pageProps} />
        </div>
        <Footer />
      </Provider>
    </>
  );
}
