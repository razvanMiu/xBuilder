'use client';
import Link from 'next/link';

export default function DefaultFooter() {
  return (
    <div className="footer">
      <div className="container mx-auto bg-info-base text-white px-4 py-4">
        <p>Footer</p>
        <Link href="http://google.ro">Google</Link>
      </div>
    </div>
  );
}
