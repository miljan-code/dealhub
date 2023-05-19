import db from '@/lib/db';
import { ListingCard } from '@/components/listing-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Icons } from '@/components/icons';

const getListings = async () => {
  const listings = await db.listing.findMany({
    include: {
      images: true,
      favorites: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!listings) return null;

  return listings;
};

const IndexPage = async () => {
  const listings = await getListings();

  if (!listings) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading className="mb-1">
          There are no currently active listings
        </EmptyState.Heading>
        <EmptyState.Text className="mb-3">
          But you can post one in just a couple of seconds ;)
        </EmptyState.Text>
      </EmptyState>
    );
  }

  return (
    <section className="flex flex-col space-y-3">
      {listings.map(item => (
        // @ts-expect-error
        <ListingCard key={item.id} {...item} />
      ))}
    </section>
  );
};

export default IndexPage;
