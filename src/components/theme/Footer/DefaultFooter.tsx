import Link from 'next/link';

export default function DefaultFooter() {
  return (
    <div className="footer bg-primary-base text-white px-4 py-4">
      <div className="container mx-auto">
        <p>Footer</p>
        <Link href="http://google.ro" className="text-white">
          Google
        </Link>
      </div>
    </div>
  );
}
