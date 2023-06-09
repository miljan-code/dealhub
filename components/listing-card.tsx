import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { getCurrentUser } from '@/lib/session';
import { siteConfig } from '@/config/site';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Icons } from '@/components/icons';
import {
  AddToFavoritesButton,
  DeleteListingButton,
  SendMessageButton,
} from '@/components/client-buttons';
import { Button } from '@/components/ui/button';
import { ListingSettingsDropdown } from '@/components/listing-settings-dropdown';
import type { ListingImage, Listing, Favorite } from '@prisma/client';

interface ListingCardProps extends Listing {
  images: ListingImage[];
  favorites: Favorite[];
}

export const ListingCard = async ({
  title,
  images,
  id,
  description,
  price,
  favorites,
  views,
  createdAt,
  location,
  authorId,
  slug,
}: ListingCardProps) => {
  const currentUser = await getCurrentUser();

  const isFavorited =
    currentUser?.favorites.some(item => item.listingId === id) || false;

  return (
    <Card className="grid grid-cols-4 justify-between gap-3 px-2 py-2 sm:grid-cols-7">
      {/* Image */}
      <Link
        href={`/listing/${slug}-${id}`}
        className="col-span-1 flex cursor-pointer items-center justify-center"
      >
        <AspectRatio ratio={1 / 1} className="overflow-hidden">
          <Image
            src={images[0]?.imageUrl || siteConfig.imagePlaceholder}
            alt={title}
            className="rounded-md object-cover"
            fill
          />
        </AspectRatio>
      </Link>
      {/* Title and Description */}
      <div className="col-span-2 flex flex-col space-y-1 py-1">
        <Link
          href={`/listing/${slug}-${id}`}
          className="truncate text-lg font-medium"
        >
          {title}
        </Link>
        <p className="line-clamp-3 text-xs text-foreground/70">{description}</p>
      </div>
      {/* Listing price */}
      <div className="flex flex-col items-center py-1.5 sm:text-start">
        <p className="font-medium text-red-500">{price}€</p>
        {/* MOBILE VIEW START */}
        <div className="flex items-start space-x-3 py-1.5 text-xs sm:hidden">
          <div className="flex items-center space-x-0.5">
            <Icons.eye size={18} />
            <span className="text-foreground/75">{views}</span>
          </div>
          <div className="flex items-center space-x-0.5">
            <Icons.star size={18} />
            <span className="text-foreground/75">{favorites?.length}</span>
          </div>
        </div>
        {currentUser?.id === authorId && (
          <ListingSettingsDropdown listingId={id} />
        )}
        {/* MOBILE VIEW END */}
      </div>
      {/* Views and Stars */}
      <div className="hidden items-start space-x-3 py-1.5 sm:flex">
        <div className="flex items-center space-x-0.5">
          <Icons.eye size={18} />
          <span className="text-foreground/75">{views}</span>
        </div>
        <div className="flex items-center space-x-0.5">
          <Icons.star size={18} />
          <span className="text-foreground/75">{favorites?.length}</span>
        </div>
      </div>
      {/* Listing Date and Location */}
      <div className="hidden flex-col py-1.5 text-sm sm:flex">
        <p className="text-xs">
          {formatDistanceToNowStrict(new Date(createdAt))} ago
        </p>
        <p className="text-foreground/80">{location}</p>
      </div>
      {/* Follow and message btns */}
      {currentUser?.id === authorId ? (
        <div className="hidden flex-col space-y-2 py-1.5 text-sm sm:flex">
          <Button className="space-x-1" variant="outline" size="sm">
            <Icons.pencil size={16} />
            <span>Edit</span>
          </Button>
          <DeleteListingButton
            variant="secondary"
            size="sm"
            className="space-x-1"
            listingId={id}
          >
            Delete
          </DeleteListingButton>
        </div>
      ) : (
        <div className="hidden flex-col space-y-2 py-1.5 text-sm sm:flex">
          <AddToFavoritesButton
            size="sm"
            variant="outline"
            className="space-x-1 text-xs"
            listingId={id}
            isFavorited={isFavorited}
          />
          <SendMessageButton
            authorId={authorId}
            listingId={id}
            variant="secondary"
            className="space-x-1 text-xs"
          >
            Chat
          </SendMessageButton>
        </div>
      )}
    </Card>
  );
};
