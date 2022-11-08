import React from 'react';

const components = {
  header: {
    component: React.lazy(
      () => import('xBuilder/components/theme/Header/DefaultHeader'),
    ),
  },
  footer: {
    component: React.lazy(
      () => import('xBuilder/components/theme/Footer/DefaultFooter'),
    ),
  },
};

export default components;
