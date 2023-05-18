import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { notFound } from 'next/navigation';
import { formatDistanceToNowStrict } from 'date-fns';
import { capitalize, getConditionLabel } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { ListingImages } from '@/components/listing-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rating } from '@/components/rating';
import {
  AddToFavoritesButton,
  SendMessageButton,
} from '@/components/client-buttons';

const getListingById = async (id: string | undefined) => {
  if (!id) return null;

  const listing = await db.listing.findFirst({
    where: {
      id: +id,
    },
    include: {
      images: true,
    },
  });

  if (!listing) return null;

  return listing;
};

const getUserById = async (id: string) => {
  const user = await db.user.findFirst({
    where: {
      id,
    },
  });

  return user;
};

interface ListingPageProps {
  params: { slug: string };
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const listingId = params.slug.split('-').at(-1);
  const listing = await getListingById(listingId);

  if (!listing) return notFound();

  const user = await getUserById(listing.authorId);

  if (!user) return notFound();

  const currentUser = await getCurrentUser();

  return (
    <section className="flex flex-col space-y-5">
      <Card>
        {/* Listing header */}
        <div className="flex items-center justify-between px-3 py-2 text-sm">
          <p>
            <Link href="/?category=sports" className="text-indigo-500">
              {capitalize(listing.category)}
            </Link>{' '}
            / Listing ID: {listing.id}
          </p>
          <p>{formatDistanceToNowStrict(new Date(listing.createdAt))} ago</p>
        </div>
        <hr />
        {/* Listing body */}
        <div className="grid grid-cols-3">
          <div className="col-span-2 grid grid-cols-2 gap-2 p-4">
            <div className="col-span-1 flex flex-col space-y-3">
              {/* Title & condition */}
              <div className="flex flex-col">
                <h2 className="text-xl">{listing.title}</h2>
                <span className="text-xs text-muted-foreground">
                  {getConditionLabel(listing.condition)}
                </span>
              </div>
              {/* Leading image */}
              <div className="h-44 w-44">
                <AspectRatio ratio={1 / 1} className="overflow-hidden">
                  <Image
                    src={listing.images[0].imageUrl || ''}
                    alt="Jacket"
                    className="rounded-md object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              {/* Price */}
              <div className="flex flex-col">
                <p className="font-medium text-red-500">
                  Price: {listing.price} €
                </p>
                <div className="flex items-center">
                  {listing.isFixedPrice && (
                    <span className="text-xs text-muted-foreground">
                      Fixed price
                    </span>
                  )}
                  {listing.isFixedPrice && listing.isTradeable && (
                    <span>&mdash;</span>
                  )}
                  {listing.isTradeable && (
                    <span className="text-xs text-muted-foreground">
                      Item is tradeable
                    </span>
                  )}
                </div>
              </div>
              {/* Seens & Stars */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Icons.eye size={16} />
                  <span className="text-xs">Seen {listing.views} times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icons.star size={16} />
                  <span className="text-xs">
                    Favorited by {listing.stars} users
                  </span>
                </div>
              </div>
              {/* Share & Favorite buttons */}
              <div className="flex w-32 flex-col space-y-1">
                <Button className="space-x-2" size="sm" variant="outline">
                  <Icons.share size={16} />
                  <span>Share</span>
                </Button>
                <AddToFavoritesButton
                  size="sm"
                  variant="outline"
                  disabled={currentUser!.id === listing.authorId}
                >
                  Favorite
                </AddToFavoritesButton>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col space-y-3 border-l border-border p-4">
            <SendMessageButton
              authorId={listing.authorId}
              listingId={listing.id}
              iconSize={20}
              className="space-x-1"
              disabled={currentUser!.id === listing.authorId}
            >
              Send a message
            </SendMessageButton>
            {/* Listing author */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.user size={18} />
              <span>{listing.username}</span>
            </div>
            {/* Author location */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.globe size={18} />
              <span>{listing.location}</span>
            </div>
            {/* Author ratings */}
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-1">
                <Icons.thumbUp size={18} className="text-green-600" />
                <span>0</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.thumbDown size={18} className="text-red-500" />
                <span>0</span>
              </div>
            </div>
            {/* Author listings */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.list size={18} />
              <Link href="/">All listings</Link>
            </div>
            {/* Authors phone number */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.phone size={18} />
              <span>{listing.phoneNumber}</span>
            </div>
          </div>
        </div>
        <hr />
        {/* Listing description */}
        <div className="p-4">
          <p className="text-sm">{listing.description}</p>
        </div>
      </Card>

      {/* Images container */}
      <ListingImages images={listing.images} />

      {/* Ratings */}
      <Card className="overflow-hidden">
        <div className="border-b border-border px-3 py-2">
          <p className="text-xs">Newest ratings for Foo Bar</p>
        </div>
        <div className="flex flex-col">
          <Rating />
          <div className="h-[1px] w-full bg-border" />
          <Rating />
          <div className="h-[1px] w-full bg-border" />
          <Rating />
        </div>
      </Card>
    </section>
  );
};

export default ListingPage;
