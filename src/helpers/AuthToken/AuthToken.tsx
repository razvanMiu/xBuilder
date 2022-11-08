import Cookies from 'js-cookie';

export function getAuthToken(nextCookies: any) {
  if (nextCookies) {
    return nextCookies.get('auth_token')?.value;
  }
  return Cookies.get('auth_token');
}
