import jwtDecode from 'jwt-decode';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'xBuilder/store';

export default function RefreshToken() {
  const router = useRouter();
  const pathname = usePathname();
  const auth_token = useStore((state) => state.user.auth_token);
  const profile = useStore((state) => state.user.profile);
  const renewAuthToken = useStore((state) => state.user.renewAuthToken);
  const timeoutId = useRef<NodeJS.Timeout | undefined>();

  const store = useStore((state) => state);

  const logout = useCallback(() => {
    router.push(`/logout?return_url=${pathname}`);
  }, [router, pathname]);

  useEffect(() => {
    if (auth_token && profile) {
      const _auth_token = jwtDecode<{ exp: number }>(auth_token);
      const currentDate = new Date().getTime();
      const expirationDate = _auth_token.exp * 1000;
      const remainingTime = expirationDate - currentDate;
      const timeout = parseInt((remainingTime * 0.9 || 60000).toString());

      if (timeoutId.current) {
        clearInterval(timeoutId.current);
      }

      if (remainingTime < 0) {
        // Session expired: token passed expiration date
        logout();
      } else {
        timeoutId.current = setTimeout(() => {
          if (_auth_token.exp * 1000 > new Date().getTime()) {
            // Session will expire: renew session
            renewAuthToken();
          } else {
            // Session expired: token passed expiration date
            logout();
          }
          timeoutId.current = undefined;
        }, timeout);
      }
    } else if (auth_token) {
      // Session expired: token not available in backend
      logout();
    }
    return () => {
      if (timeoutId.current) {
        clearInterval(timeoutId.current);
      }
    };
    /* eslint-disable-next-line */
  }, [auth_token]);

  return null;
}
