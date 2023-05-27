import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import db from '@/lib/db';
import { countRatings } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Rating } from '@/components/rating';
import { ListingCard } from '@/components/listing-card';

const SHOW_LISTINGS = 3;

const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      listings: {
        include: {
          images: true,
          favorites: true,
        },
        take: SHOW_LISTINGS,
      },
      ratings: {
        include: {
          listing: true,
        },
      },
      _count: {
        select: {
          listings: true,
        },
      },
    },
  });

  return user;
};

interface Params {
  params: { userId: string };
}

const UserPage = async ({ params }: Params) => {
  const { userId } = params;

  const user = await getUserById(userId);

  if (!user) return notFound();

  const { positiveRatings, negativeRatings } = countRatings(user.ratings);

  return (
    <section className="flex flex-col gap-3">
      <Card className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <span className="pb-1.5 text-xs text-muted-foreground">
            Member since: {format(user.createdAt, 'dd. MMM yyyy')}
          </span>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1">
              <Icons.thumbUp size={18} className="text-green-600" />
              <span>{positiveRatings}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icons.thumbDown size={18} className="text-red-500" />
              <span>{negativeRatings}</span>
            </div>
          </div>
          <span className="text-xs">
            Total listings: {user._count.listings}
          </span>
        </div>
        <div className="relative h-24 w-24 overflow-hidden rounded-full">
          <Image
            src={user.image || siteConfig.userPlaceholder}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
      </Card>

      {user.ratings && user.ratings.length > 0 && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 text-xs">
            <span>Recent ratings for user {user.name}</span>
            <span className="flex cursor-pointer items-center gap-0.5">
              Show all <Icons.down size={10} />
            </span>
          </div>
          <hr />
          <div className="flex flex-col">
            {user.ratings.map((item, i) => (
              <>
                {/* @ts-expect-error */}
                <Rating key={item.id} {...item} />
                {i !== user.ratings.length - 1 && <hr />}
              </>
            ))}
          </div>
        </Card>
      )}

      {user.listings.map(item => (
        // @ts-expect-error
        <ListingCard key={item} {...item} />
      ))}
      {user.listings.length === SHOW_LISTINGS && (
        <span className="mt-2 flex cursor-pointer items-center justify-center gap-0.5 text-xs">
          Show all <Icons.down size={10} />
        </span>
      )}
    </section>
  );
};

export default UserPage;
