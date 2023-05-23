'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Navigation } from '@/components/navigation';
import type { Session } from 'next-auth';

interface MenuProps {
  session: Session | null;
  notificationCount: number;
}

export const Menu = ({ session, notificationCount }: MenuProps) => {
  const router = useRouter();

  const currentUser = session?.user;

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
          <div
            onClick={() => router.push('/login')}
            className="relative cursor-pointer"
          >
            <div className="absolute inset-0 h-full w-full backdrop-blur-[2px]" />
            <Navigation
              notificationCount={notificationCount}
              items={siteConfig.mainNav}
            />
          </div>
        </>
      )}
      {!!currentUser && (
        <>
          <Navigation
            notificationCount={notificationCount}
            items={siteConfig.mainNav}
          />
          <hr />
          <Button
            variant="ghost"
            size="xs"
            className="justify-start space-x-2 text-xs"
            onClick={() => signOut()}
          >
            <Icons.logout size={14} />
            <span>Sign out</span>
          </Button>
        </>
      )}
    </Card>
  );
};
