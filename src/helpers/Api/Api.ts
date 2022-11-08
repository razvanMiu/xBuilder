import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import { getAuthToken } from 'xBuilder/helpers/AuthToken/AuthToken';
import config from 'xBuilder/registry';

type ApiMethod = (
  path: string,
  options?: {
    cache?: any;
    data?: any | undefined;
    headers?: {} | undefined;
  },
) => Promise<unknown>;

const methods = ['get', 'post', 'put', 'patch', 'del'];

const defaultHeaders: { [key: string]: { [key: string]: any } } = {
  get: {},
  post: {
    'Content-Type': 'application/json',
  },
  put: {},
  patch: {},
  del: {},
  common: {
    Accept: 'application/json',
  },
};

function removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, '');
}

function formatUrl(path: string) {
  const { settings } = config;

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return removeTrailingSlash(`${settings.internalApiPath}${adjustedPath}`);
}

export function getError(error: any) {
  try {
    return JSON.parse(error.response?.text);
  } catch {
    return error.response?.body || error;
  }
}

export class Api {
  [key: string]: ApiMethod | Function;

  constructor(nextCookies?: ReadonlyRequestCookies) {
    methods.forEach((method) => {
      this[method] = (path, { data, headers = {}, ...rest } = {}) => {
        const authToken = getAuthToken(nextCookies);
        return fetch(formatUrl(path), {
          method: method.toUpperCase(),
          headers: {
            Accept: 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            ...defaultHeaders['common'],
            ...defaultHeaders[method],
            ...headers,
          },
          ...(data ? { body: JSON.stringify(data) } : {}),
          ...(rest || {}),
        }).then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            return data;
          }
          throw data;
        });
      };
    });
  }
}

export default Api;
