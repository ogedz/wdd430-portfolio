'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Projects', href: '/projects' },
  ];

  return (
    <nav className="flex gap-4">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              isActive ? 'font-bold text-yellow-300 underline' : 'text-white hover:text-blue-200'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}