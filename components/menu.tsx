import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/session';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Navigation } from '@/components/navigation';
import { SignOutButton } from '@/components/client-buttons';
import { NoAuthSidebar } from '@/components/no-auth-sidebar';

export const Menu = async () => {
  const currentUser = await getCurrentUser();

  const notificationCount = currentUser?.notifications?.length || 0;

  return (
    <Card className="flex flex-col space-y-3 px-4 py-3">
      <span className="text-xs font-medium text-foreground/75">
        My {siteConfig.name}
      </span>
      {!currentUser && (
        <>
          <div className="flex flex-col space-y-1">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'space-x-2'
              )}
            >
              <Icons.login size={16} />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              Register
            </Link>
          </div>
          <NoAuthSidebar />
        </>
      )}
      {!!currentUser && (
        <>
          <Navigation
            notificationCount={notificationCount}
            items={siteConfig.mainNav}
          />
          <hr />
          <SignOutButton variant="ghost" size="xs" iconSize={14} />
        </>
      )}
    </Card>
  );
};
