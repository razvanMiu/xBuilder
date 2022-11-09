import dynamic from 'next/dynamic';

// Layout View Registry
export const layoutViews = {
  document_view: dynamic(
    () => import('xBuilder/components/theme/View/DefaultView'),
  ),
  summary_view: dynamic(
    () => import('xBuilder/components/theme/View/SummaryView'),
  ),
};

// Content Types View Registry
export const contentTypesViews = {};

// Default view
export const defaultView = dynamic(
  () => import('xBuilder/components/theme/View/DefaultView'),
);

export const errorViews = {
  // '404': NotFoundView,
  // '401': Unauthorized,
  // '403': Forbidden,
  // '408': RequestTimeout,
  // ECONNREFUSED: ConnectionRefused,
  // corsError: CorsError,
};
