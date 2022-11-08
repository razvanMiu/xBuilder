'use client';
import cx from 'classnames';
import get from 'lodash/get';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Button } from 'xBuilder/components/ui';
import { useStore } from 'xBuilder/store';

export default function Login(props: any) {
  const router = useRouter();
  const api = useStore((state) => state.api);
  const user = useStore((state) => state.user);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  const { setProfile, setAuthToken } = user;

  const { searchParams } = props;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const user = await api.post('/@login', {
          data: { login, password },
        });
        setAuthToken(user.access_token);
        setErrors(null);
        setProfile(user.data);
        router.push(searchParams.return_url || '');
      } catch (errors) {
        setErrors(get(errors, 'message'));
      }
    }, 1000);
  }

  return (
    <div className="container max-w-screen-sm my-4 m-auto">
      <h1>Login</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">User:</label>
          {errors?.login && <p className="text-danger-light">{errors.login}</p>}
          <input
            name="login"
            type="text"
            className={cx('form-input block w-full', {
              'border-danger-light': !!errors?.login,
            })}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password">Password:</label>
          {errors?.password && (
            <p className="text-danger-light">{errors.password}</p>
          )}
          <input
            name="password"
            type="password"
            autoComplete="password"
            className={cx('form-input block w-full', {
              'border-danger-light': !!errors?.password,
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="mt-4" loading={loading} type="submit">
          Submit
        </Button>
        <p className="mt-4">
          <Link href="/reset-password">I forgot my password!</Link>
        </p>
      </form>
    </div>
  );
}
