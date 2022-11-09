import { ParsedUrlQuery } from 'querystring';

export function getPathname(
  query: ParsedUrlQuery,
  trailingSlash: boolean = true,
): string {
  const pathname = !query.document
    ? '/'
    : typeof query.document === 'string'
    ? `/${query.document}`
    : `/${query.document?.join('/') || ''}`;
  return trailingSlash ? pathname : removeTrailingSlash(pathname);
}

export function removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, '');
}
