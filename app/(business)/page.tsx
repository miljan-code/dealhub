import { Product } from '@/components/product';
import db from '@/lib/db';

const getListings = async () => {
  const listings = await db.listing.findMany();

  if (!listings) return null;

  return listings;
};

const IndexPage = async () => {
  const listings = await getListings();

  if (!listings) return <p>Empty state...</p>;

  return (
    <section className="flex flex-col space-y-3">
      {listings.map(item => (
        <Product key={item.id} />
      ))}
    </section>
  );
};

export default IndexPage;
