import db from '@/lib/db';
import { ListingCard } from '@/components/listing-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Icons } from '@/components/icons';
import { Prisma } from '@prisma/client';

interface QueryOptions {
  category?: string;
  term?: string;
}

const getListings = async (options: QueryOptions) => {
  let query: Prisma.ListingWhereInput = {};

  if (options.category) {
    query.category = options.category;
  }

  if (options.term) {
    query.title = {
      contains: options.term,
    };
  }

  const listings = await db.listing.findMany({
    include: {
      images: true,
      favorites: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: query,
  });

  if (!listings) return null;

  return listings;
};

interface Params {
  searchParams: {
    category: string;
    term: string;
  };
}

const IndexPage = async ({ searchParams }: Params) => {
  const { category, term } = searchParams;

  const listings = await getListings({ category, term });

  if (!listings || !listings.length) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading className="mb-1">
          There are no currently active listings
        </EmptyState.Heading>
        <EmptyState.Text className="mb-3">
          But you can post one in just a couple of seconds
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
