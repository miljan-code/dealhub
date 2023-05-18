import db from '@/lib/db';
import { ListingCard } from '@/components/listing-card';

const getListings = async () => {
  const listings = await db.listing.findMany({
    include: {
      images: true,
      favorites: true,
    },
  });

  if (!listings) return null;

  return listings;
};

const IndexPage = async () => {
  const listings = await getListings();

  if (!listings) return <p>Empty state...</p>;

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
