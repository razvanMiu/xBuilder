'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Login from 'xBuilder/components/theme/Login/Login';
import { useStore } from 'xBuilder/store';

export default function Page(props: any) {
  const router = useRouter();
  const auth_token = useStore((state) => state.user.auth_token);
  const { searchParams } = props;

  useEffect(() => {
    if (auth_token) {
      router.push(searchParams.return_url || '');
    }
    /* eslint-disable-next-line */
  }, []);

  return (
    <div className="h-full flex flex-col justify-center">
      <Login {...props} />
    </div>
  );
}
