import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import db from '@/lib/db';

const getListingsCount = async () => {
  return await db.listing.aggregate({
    _count: true,
  });
};

export const Header = async () => {
  const { _count: listingsCount } = await getListingsCount();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-12 px-2 sm:justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={`Anything you want... (${listingsCount} listings)`}
          />
          <Button variant="secondary" className="absolute bottom-0 right-0">
            <Icons.search />
          </Button>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Link href="/create" className={cn(buttonVariants(), 'space-x-1')}>
            <Icons.plus />
            <span>Sell something</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
