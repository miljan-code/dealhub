import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import type { NavItem } from '@/types/nav';

interface NavigationProps {
  items: NavItem[];
  notificationCount?: number;
}

export const Navigation = ({
  items,
  notificationCount = 0,
}: NavigationProps) => {
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
          {item.href === '/notifications' && notificationCount > 0 && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
              {notificationCount}
            </div>
          )}
        </Link>
      ))}
    </nav>
  );
};
