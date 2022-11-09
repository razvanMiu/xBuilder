import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCallback, useMemo } from 'react';
import Api from 'xBuilder/helpers/Api/Api';
import Error from 'xBuilder/pages/_error';
import config from 'xBuilder/registry';
import { initializeStore, useStore } from 'xBuilder/store';

export default function Document() {
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
      <div className="container mx-auto py-4">
        <RenderedView />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialStoreState?: { [key: string]: any };
}> = async ({ query }) => {
  const path =
    typeof query.document === 'string'
      ? `/${query.document}`
      : query.document?.join('/') || '';

  return {
    props: {
      initialStoreState: {
        content: {
          path,
        },
      },
    },
  };
};
