import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCallback, useMemo } from 'react';
import Error from 'xBuilder/pages/_error';
import config from 'xBuilder/registry';
import { initializeStore, useStore } from 'xBuilder/store';

export default function Edit() {
  const { views = {} } = config;

  const content = useStore((state) => state.content.data);
  const content_error = useStore((state) => state.content.error);

  const getViewDefault = useCallback(() => views.defaultView, [views]);

  const getViewByType = useCallback(
    () => views.contentTypesViews[content?.['@type']] || null,
    [views, content],
  );

  const getViewByLayout = useCallback(
    () => views.layoutViews[content?.['layout']] || null,
    [views, content],
  );

  const RenderedView = useMemo(
    () => getViewByType() || getViewByLayout() || getViewDefault(),
    [getViewByType, getViewByLayout, getViewDefault],
  );

  return content_error ? (
    <>
      <Head>
        <title key="title">{content_error.error}</title>
        <meta
          key="description"
          name="description"
          content={`${content_error.statusCode} | ${content_error.message}`}
        />
      </Head>
      <Error
        statusCode={content_error.statusCode}
        title={content_error.message}
      />
    </>
  ) : (
    <>
      <Head>
        <title key="title">{content?.title || 'Document'}</title>
        <meta
          key="description"
          name="description"
          content={content?.description || 'Document description'}
        />
      </Head>
      <RenderedView />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialStoreState?: { [key: string]: any };
}> = async ({ req, res, query }) => {
  const path =
    typeof query.document === 'string'
      ? `/${query.document}`
      : query.document?.join('/') || '';
  const zustandStore = initializeStore({}, req.cookies);
  const state = zustandStore.getState();
  const serializedState = JSON.parse(JSON.stringify(state));
  const api = state.api;

  const [content, content_error] = await api.get(path);

  if (content_error && !req.url?.startsWith('/_next/data')) {
    res.statusCode = content_error.statusCode;
  }

  return {
    props: {
      initialStoreState: {
        content: {
          ...serializedState.content,
          data: content || null,
          error: content_error || null,
        },
      },
    },
  };
};
