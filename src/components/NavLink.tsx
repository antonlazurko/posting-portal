import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NavLinkCompatProps extends Omit<LinkProps, 'className' | 'href'> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children: React.ReactNode;
  to: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to;
    const { href, ...rest } = props as any; // Handle potential href in props

    return (
      <Link ref={ref} href={to} className={cn(className, isActive && activeClassName)} {...rest} />
    );
  }
);

NavLink.displayName = 'NavLink';

export { NavLink };
