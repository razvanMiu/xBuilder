import dynamic from 'next/dynamic';

const components = {
  header: {
    component: dynamic(
      () => import('xBuilder/components/theme/Header/DefaultHeader'),
    ),
  },
  footer: {
    component: dynamic(
      () => import('xBuilder/components/theme/Footer/DefaultFooter'),
    ),
  },
};

export default components;
