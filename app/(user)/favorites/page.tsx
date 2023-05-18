import { getCurrentUser } from '@/lib/session';
import { Icons } from '@/components/icons';
import { EmptyState } from '@/components/ui/empty-state';
import { ListingCard } from '@/components/listing-card';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  if (currentUser.favorites.length < 1) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading>Your favorites list is empty</EmptyState.Heading>
        <EmptyState.Text>
          Find listings you like and add them to your favorites
        </EmptyState.Text>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      {currentUser.favorites.map(item => (
        // @ts-expect-error
        <ListingCard key={item.listing.id} {...item.listing} />
      ))}
    </div>
  );
};

export default FavoritesPage;
