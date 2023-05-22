import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { EmptyState } from '@/components/ui/empty-state';
import { Icons } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rating } from '@/components/rating';
import { Card } from '@/components/ui/card';

const RatingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return notFound();

  if (!currentUser.ratings.length) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading className="mb-1">
          You don&apos;t have any ratings
        </EmptyState.Heading>
        <EmptyState.Text className="mb-3 w-1/2 text-center">
          Sell or buy something to get one, users with large amount of positive
          ratings are more likely to sell items.
        </EmptyState.Text>
      </EmptyState>
    );
  }

  const positiveRatings = currentUser.ratings.filter(
    item => item.overallRating
  );
  const negativeRatings = currentUser.ratings.filter(
    item => !item.overallRating
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="positive">Positive</TabsTrigger>
        <TabsTrigger value="negative">Negative</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="flex flex-col gap-2">
        {currentUser.ratings.map(item => (
          <Card key={item.id}>
            {/* @ts-expect-error */}
            <Rating {...item} />
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="positive" className="mt-0 flex flex-col gap-2">
        {positiveRatings.map(item => (
          <Card key={item.id}>
            {/* @ts-expect-error */}
            <Rating {...item} />
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="negative" className="mt-0 flex flex-col gap-2">
        {negativeRatings.map(item => (
          <Card key={item.id}>
            {/* @ts-expect-error */}
            <Rating {...item} />
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default RatingsPage;
