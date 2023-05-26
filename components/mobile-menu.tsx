'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useMounted } from '@/hooks/use-mounted';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

interface MenuContentProps {
  onCloseMenu: () => void;
}

const MenuContent = ({ onCloseMenu }: MenuContentProps) => {
  const mounted = useMounted();
  useLockBodyScroll();

  return (
    <div
      className={cn(
        'fixed right-0 top-0 z-50 h-screen w-1/2 bg-background/90 backdrop-blur-sm transition duration-300',
        {
          'translate-x-full': !mounted,
          'translate-x-0': mounted,
        }
      )}
    >
      <div className="flex cursor-pointer justify-end px-2 pt-4">
        <Icons.close size={32} onClick={onCloseMenu} />
      </div>
      <div onClick={onCloseMenu} className="flex flex-col items-center gap-2">
        <Link
          href="/"
          className="mb-4 flex items-center justify-center space-x-2"
        >
          <Icons.logo className="h-12 w-12" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>
        {siteConfig.mainNav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'justify-start space-x-2 text-sm'
            )}
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </Link>
        ))}
        <Link href="/create" className={cn(buttonVariants())}>
          <Icons.plus />
          <span>Sell something</span>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => setShowMenu(prev => !prev);

  return (
    <div className="sm:hidden">
      {!showMenu && (
        <Icons.menu
          onClick={handleShowMenu}
          size={32}
          className="cursor-pointer"
        />
      )}
      {showMenu && <MenuContent onCloseMenu={handleShowMenu} />}
    </div>
  );
};
