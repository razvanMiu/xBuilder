import Cookies from 'js-cookie';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export function getAuthToken(nextCookies?: NextApiRequestCookies) {
  if (nextCookies) {
    return nextCookies['auth_token'];
  }
  return Cookies.get('auth_token');
}
