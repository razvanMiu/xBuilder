import 'xBuilder/styles/globals.css';
import 'xBuilder/config';

import get from 'lodash/get';
import merge from 'lodash/merge';
import NextApp from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import React, { useMemo } from 'react';
import Footer from 'xBuilder/components/theme/Footer/Footer';
import Header from 'xBuilder/components/theme/Header/Header';
import RefreshToken from 'xBuilder/components/theme/RefreshToken/RefreshToken';
import Api from 'xBuilder/helpers/Api/Api';
import { getPathname } from 'xBuilder/helpers/Url/Url';
import config from 'xBuilder/registry';
import { Provider, StoreState, useCreateStore } from 'xBuilder/store';

import type { AppContext, AppProps } from 'next/app';
export default function App({
  Component,
  pageProps,
  pathname,
  initialStoreState,
}: AppProps & { pathname: string; initialStoreState: StoreState }) {
  const initialState = useMemo(
    () => merge({}, initialStoreState, pageProps.initialStoreState),
    [initialStoreState, pageProps.initialStoreState],
  );
  const createStore = useCreateStore(initialState);
  const canonicalUrl = config.settings.appUrl + pathname;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="black"
        />
      </Head>
      <Provider createStore={createStore}>
        <RefreshToken />
        <Header />
        <div className="main flex-1">
          <Component {...pageProps} />
        </div>
        <Footer />
      </Provider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps: any = await NextApp.getInitialProps(appContext);
  const { query, req, res } = appContext.ctx;
  const cookies = get(req, 'cookies');
  const pathname = getPathname(query, false);
  const api = new Api(cookies);

  const [content, content_error] = await api.get(pathname);

  if (content_error && res && !req?.url?.startsWith('/_next/data')) {
    res.statusCode = content_error.statusCode;
  }

  return {
    ...appProps,
    pathname,
    query,
    initialStoreState: {
      content: {
        data: content || null,
        error: content_error || null,
      },
    },
  };
};
