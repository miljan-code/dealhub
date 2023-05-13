import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import type { NavItem } from '@/types/nav';

interface NavigationProps {
  items: NavItem[];
}

export const Navigation = ({ items }: NavigationProps) => {
  return (
    <nav className="flex flex-col space-y-1">
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'xs' }),
            'justify-start space-x-2 text-xs'
          )}
        >
          <item.icon size={14} />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};
