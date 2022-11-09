import ConfigRegistry from 'xBuilder/registry';

import components from './Components';
import {
  contentTypesViews,
  defaultView,
  errorViews,
  layoutViews,
} from './Views';

const _DEVELOPMENT_ = process.env._DEVELOPMENT_;

const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_PORT || '3000';

const appUrl = `${protocol}://${host}${port ? `:${port}` : ''}`;
const internalApiPath = `${appUrl}/api`;
const externalApiPath = process.env.NEXT_PUBLIC_EXTERNAL_API_PATH;

const config = {
  settings: {
    _DEVELOPMENT_,
    appUrl,
    internalApiPath,
    externalApiPath,
    defaultTheme: 'light',
  },
  components,
  views: {
    layoutViews,
    contentTypesViews,
    defaultView,
    errorViews,
  },
};

ConfigRegistry.settings = config.settings;
ConfigRegistry.components = config.components;
ConfigRegistry.views = config.views;

export default ConfigRegistry;
