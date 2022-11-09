import cx from 'classnames';
import NextLink from 'next/link';
import usePathname from 'xBuilder/hooks/usePathname';

const Link = (props: any) => {
  const pathname = usePathname();

  return (
    <NextLink
      {...props}
      className={cx({ 'no-underline': pathname !== props.href })}
    />
  );
};

export default function DefaultHeader() {
  const pathname = usePathname({ trailingSlash: false });

  return (
    <div className="navigation container mx-auto">
      <nav className="flex space-x-4">
        <NextLink href={`${pathname}/edit`} className="no-underline">
          Edit
        </NextLink>
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </nav>
    </div>
  );
}
