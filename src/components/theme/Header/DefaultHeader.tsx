import Link from 'next/link';

export default function DefaultHeader() {
  return (
    <div className="navigation container mx-auto">
      <nav className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </nav>
    </div>
  );
}
