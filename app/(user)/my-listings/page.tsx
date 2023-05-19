import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/session';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListingCard } from '@/components/listing-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return notFound();

  if (currentUser.listings.length < 1) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading className="mb-1">
          You don&apos;t have any listings
        </EmptyState.Heading>
        <EmptyState.Text className="mb-3">
          But you can post one in just a couple of seconds ;)
        </EmptyState.Text>
        <Link href="/create" className={cn(buttonVariants(), 'space-x-1')}>
          <Icons.plus />
          <span>Sell something</span>
        </Link>
      </EmptyState>
    );
  }

  return (
    <Tabs defaultValue="active">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="expiring">Expiring soon</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="flex flex-col space-y-2">
        {currentUser.listings.map(item => (
          // @ts-expect-error
          <ListingCard key={item.id} {...item} />
        ))}
      </TabsContent>
      <TabsContent value="expiring">Expiring soon</TabsContent>
      <TabsContent value="inactive">Inactive</TabsContent>
    </Tabs>
  );
};

export default MyListingsPage;
