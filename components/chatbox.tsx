import { Card } from '@/components/ui/card';
import type {
  Chat,
  Favorite,
  Listing,
  ListingImage,
  Message,
  User,
} from '@prisma/client';
import { Icons } from './icons';
import Link from 'next/link';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { formatDistanceToNowStrict } from 'date-fns';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export type ListingWithImageAndFavorites = Listing & {
  images: ListingImage[];
  favorites: Favorite[];
};

// export type ChatWithListingAndMessages = Chat & {
//   listing: ListingWithImageAndFavorites;
//   messages: Message[];
// };

interface ChatboxProps {
  listings: ListingWithImageAndFavorites[];
  currentUser: User;
  user: User;
  // chats: ChatWithListingAndMessages[] | undefined;
}

export const Chatbox = ({ listings, currentUser, user }: ChatboxProps) => {
  const [listing] = listings;

  return (
    <Card>
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <Icons.user size={16} />
          <span className="text-sm">{user.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {/* TODO: popover */}
          <Icons.thumbUp size={16} />
          <span className="text-sm">Rate user</span>
        </div>
      </div>
      <hr />
      {/* Listing INFO */}
      <div className="flex flex-col space-y-2 px-4 py-2">
        <div className="grid h-24 grid-cols-6 gap-6">
          <Link
            href={`/listing/${listing.slug}-${listing.id}`}
            className="col-span-1 flex cursor-pointer items-center justify-center"
          >
            <AspectRatio ratio={1 / 1} className="overflow-hidden">
              <Image
                src={listing.images[0]?.imageUrl || siteConfig.imagePlaceholder}
                alt={listing.title}
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>
          </Link>
          <div className="col-span-2 flex flex-col space-y-1 py-1">
            <Link
              href={`/listing/${listing.slug}-${listing.id}`}
              className="truncate text-lg font-medium"
            >
              {listing.title}
            </Link>
            <p className="line-clamp-3 text-xs text-foreground/70">
              {listing.description}
            </p>
          </div>
          <div className="py-1.5">
            <p className="font-medium text-red-500">{listing.price}€</p>
          </div>
          {/* Views and Stars */}
          <div className="flex items-start space-x-3 py-1.5">
            <div className="flex items-center space-x-0.5">
              <Icons.eye size={18} />
              <span className="text-foreground/75">{listing.views}</span>
            </div>
            <div className="flex items-center space-x-0.5">
              <Icons.star size={18} />
              <span className="text-foreground/75">
                {listing.favorites.length}
              </span>
            </div>
          </div>
          {/* Listing Date and Location */}
          <div className="flex flex-col py-1.5 text-sm">
            <p className="text-xs">
              {formatDistanceToNowStrict(new Date(listing.createdAt))} ago
            </p>
            <p className="text-foreground/80">{listing.location}</p>
          </div>
        </div>
      </div>
      <hr />
      {/* Chat window */}
      {/* TODO: change pattern based on theme */}
      <div className="px-4 py-3">
        <Card className="flex h-96 flex-col-reverse gap-2 overflow-y-scroll bg-chat-pattern px-4 py-2"></Card>
      </div>
      <div className="px-4">
        <Textarea className="h-20" placeholder="Write your message here" />
      </div>
      <div className="flex items-center justify-end px-4 py-3">
        <Button className="space-x-2">
          <Icons.send size={18} />
          <span>Send message</span>
        </Button>
      </div>
    </Card>
  );
};
