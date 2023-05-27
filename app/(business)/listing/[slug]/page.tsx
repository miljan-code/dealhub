import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { formatDistanceToNowStrict } from 'date-fns';
import { capitalize, countRatings, getConditionLabel } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { ListingImages } from '@/components/listing-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { Rating } from '@/components/rating';
import {
  AddToFavoritesButton,
  SendMessageButton,
  ShareButton,
} from '@/components/client-buttons';
import { ReportView } from '@/components/report-view';

const RATINGS_PER_LISTING = 3;

const getListingById = async (id: string | undefined) => {
  if (!id) return null;

  const listing = await db.listing.findFirst({
    where: {
      id: +id,
    },
    include: {
      images: true,
      favorites: true,
      user: {
        include: {
          ratings: {
            include: {
              listing: true,
            },
          },
        },
      },
    },
  });

  if (!listing) return null;

  return listing;
};

interface ListingPageProps {
  params: { slug: string };
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const listingId = params.slug.split('-').at(-1);
  const listing = await getListingById(listingId);

  if (!listing) return notFound();

  const currentUser = await getCurrentUser();

  const isFavorited =
    currentUser?.favorites.some(item => item.listingId === listing.id) || false;

  const { positiveRatings, negativeRatings } = countRatings(
    listing.user.ratings
  );

  const ratings = listing.user.ratings.slice(0, RATINGS_PER_LISTING);

  return (
    <section className="flex flex-col space-y-5">
      <Card>
        {/* Listing header */}
        <div className="flex items-center justify-between px-3 py-2 text-sm">
          <p>
            <Link
              href={`/?category=${listing.category}`}
              className="text-indigo-500"
            >
              {capitalize(listing.category)}
            </Link>{' '}
            / Listing ID: {listing.id}
          </p>
          <p>{formatDistanceToNowStrict(new Date(listing.createdAt))} ago</p>
        </div>
        <hr />
        {/* Listing body */}
        <div className="grid sm:grid-cols-3">
          <div className="col-span-2 grid gap-2 p-4 sm:grid-cols-2">
            <div className="col-span-1 flex flex-col space-y-3">
              {/* Title & condition */}
              <div className="flex flex-col">
                <h2 className="text-xl">{listing.title}</h2>
                <span className="text-xs text-muted-foreground">
                  {getConditionLabel(listing.condition)}
                </span>
              </div>
              {/* Leading image */}
              <div className="sm:h-44 sm:w-44">
                <AspectRatio ratio={1 / 1} className="overflow-hidden">
                  <Image
                    src={
                      listing.images[0]?.imageUrl || siteConfig.imagePlaceholder
                    }
                    alt="Jacket"
                    className="rounded-md object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 sm:flex-col sm:flex-nowrap">
              {/* Price */}
              <div className="flex basis-full flex-col sm:basis-auto">
                <p className="font-medium text-red-500">
                  Price: {listing.price} €
                </p>
                <div className="flex items-center space-x-2">
                  {listing.isFixedPrice && (
                    <span className="text-xs text-muted-foreground">
                      Fixed price
                    </span>
                  )}
                  {listing.isFixedPrice && listing.isTradeable && (
                    <span className="text-xs text-muted-foreground">
                      &mdash;
                    </span>
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
                    Favorited by {listing.favorites.length} users
                  </span>
                </div>
              </div>
              {/* Share & Favorite buttons */}
              <div className="flex w-32 flex-col gap-1">
                <ShareButton slug={`/listing/${params.slug}`} />
                <AddToFavoritesButton
                  size="sm"
                  variant="outline"
                  disabled={currentUser?.id === listing.authorId}
                  listingId={listing.id}
                  isFavorited={isFavorited}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-5 border-l border-border p-4 sm:col-span-1 sm:flex-col sm:flex-nowrap sm:justify-start sm:gap-3">
            <SendMessageButton
              authorId={listing.authorId}
              listingId={listing.id}
              iconSize={20}
              className="w-full space-x-1 sm:w-fit"
              disabled={currentUser?.id === listing.authorId}
            >
              Send a message
            </SendMessageButton>
            {/* Listing author */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.user size={18} />
              <Link href={`/user/${listing.authorId}`}>{listing.username}</Link>
            </div>
            {/* Author location */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.globe size={18} />
              <span>{listing.location}</span>
            </div>
            {/* Author ratings */}
            <div className="flex items-center space-x-3 text-sm">
              <Link
                href={`/user/${listing.authorId}`}
                className="flex items-center space-x-1"
              >
                <Icons.thumbUp size={18} className="text-green-600" />
                <span>{positiveRatings}</span>
              </Link>
              <Link
                href={`/user/${listing.authorId}`}
                className="flex items-center space-x-1"
              >
                <Icons.thumbDown size={18} className="text-red-500" />
                <span>{negativeRatings}</span>
              </Link>
            </div>
            {/* Author listings */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.list size={18} />
              <Link href={`/user/${listing.authorId}`}>All listings</Link>
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
      {listing.images.length > 0 && <ListingImages images={listing.images} />}

      {/* Ratings */}
      {ratings && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-3 py-2 text-xs">
            <p>Newest ratings for Foo Bar</p>
            <Link href={`/user/${listing.authorId}`}>Show all</Link>
          </div>
          <div className="flex flex-col">
            {ratings.map((item, i) => (
              <>
                {/* @ts-expect-error */}
                <Rating key={item.id} {...item} />
                {i !== ratings.length - 1 && <hr />}
              </>
            ))}
          </div>
        </Card>
      )}

      {/* Analytics */}
      <ReportView listingId={listing.id} />
    </section>
  );
};

export default ListingPage;
