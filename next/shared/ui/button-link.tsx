import Link from 'next/link';
import { ReactNode } from 'react';
import './ui.css';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: ButtonLinkProps) {
  const className =
    variant === 'primary' ? 'btn btn--primary' : 'btn btn--secondary';

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
