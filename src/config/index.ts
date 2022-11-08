import ConfigRegistry from 'xBuilder/registry';

import components from './Components';

const _DEVELOPMENT_ = process.env._DEVELOPMENT_;

const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_PORT || '3000';

const internalApiPath = _DEVELOPMENT_
  ? `http://${host}:${port}/api`
  : `${host}/api`;
const externalApiPath = process.env.NEXT_PUBLIC_EXTERNAL_API_PATH;

const config = {
  settings: {
    _DEVELOPMENT_,
    internalApiPath,
    externalApiPath,
    defaultTheme: 'light',
  },
  components,
};

ConfigRegistry.settings = config.settings;
ConfigRegistry.components = config.components;

export default ConfigRegistry;
