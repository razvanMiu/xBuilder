'use client';
import { useEffect } from 'react';
import Login from 'xBuilder/components/theme/Login/Login';
import { useStore } from 'xBuilder/store';

export default function RefreshToken(props: any) {
  const reset = useStore((state) => state.reset);

  useEffect(() => {
    reset();
    /* eslint-disable-next-line */
  }, []);

  return <Login {...props} />;
}
