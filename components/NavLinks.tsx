'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/meetings',
      label: 'All Meetings',
    },
    {
      href: '/meetings/current',
      label: 'Current Meeting',
    },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive
                    ? 'font-semibold text-blue-700'
                    : 'text-gray-600 hover:text-blue-700'
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}