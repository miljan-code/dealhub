import Link from 'next/link';
import db from '@/lib/db';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Search } from '@/components/search';
import { MobileMenu } from '@/components/mobile-menu';

const getListingsCount = async () => {
  return await db.listing.aggregate({
    _count: true,
  });
};

export const Header = async () => {
  const { _count: listingsCount } = await getListingsCount();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-2 sm:gap-12">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <div className="hidden flex-1 md:block">
          <Search listingsCount={listingsCount} />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link
            href="/create"
            className={cn(buttonVariants(), 'hidden space-x-1 sm:flex')}
          >
            <Icons.plus />
            <span>Sell something</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
