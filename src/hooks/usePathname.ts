import { useRouter } from 'next/router';
import { getPathname } from 'xBuilder/helpers/Url/Url';

export default function usePathname(options?: { trailingSlash?: boolean }) {
  const { query } = useRouter();
  const { trailingSlash = true } = options || {};

  return getPathname(query, trailingSlash);
}
