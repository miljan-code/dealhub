'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { siteConfig } from '@/config/site';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Message } from '@/components/message';
import { RatingDialog } from '@/components/rating-dialog';
import { toast } from '@/components/ui/use-toast';
import type {
  Chat,
  Favorite,
  Listing,
  ListingImage,
  Message as MessageType,
  Rating,
  User,
} from '@prisma/client';

export type ListingWithImageAndFavorites = Listing & {
  images: ListingImage[];
  favorites: Favorite[];
};

export type ChatWithListingAndMessages = Chat & {
  listing: ListingWithImageAndFavorites;
  messages: (MessageType & {
    sender: User;
  })[];
  ratings: Rating[];
};

interface ChatboxProps {
  listing: ListingWithImageAndFavorites;
  currentUser: User;
  user: User;
  chats: ChatWithListingAndMessages[] | undefined;
}

export const Chatbox = ({
  listing,
  currentUser,
  user,
  chats,
}: ChatboxProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = useMemo(() => {
    const userIds: string[] = [currentUser.id, user.id];

    const chat = chats?.find(
      item =>
        item.listingId === listing.id &&
        userIds.includes(item.userOneId) &&
        userIds.includes(item.userTwoId)
    );

    return chat;
  }, [chats, currentUser.id, user.id, listing.id]);

  const isRateable = useMemo(() => {
    if (!activeChat) return false;

    const userIds = [currentUser.id, user.id];

    const ratingAuthorsIdsForActiveChat = activeChat.ratings.map(
      item => item.authorId
    );

    if (ratingAuthorsIdsForActiveChat.includes(currentUser.id)) {
      return false;
    }

    const chatParticipantIds = activeChat?.messages.map(item => item.senderId);

    return userIds.every(id => chatParticipantIds.includes(id));
  }, [currentUser.id, user.id, activeChat]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const message = textareaRef.current?.value;

    if (!message) return null;

    setIsLoading(true);

    const res = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: currentUser.id,
        receiverId: user.id,
        listingId: listing.id,
        message: message,
      }),
    });

    setIsLoading(false);

    if (!res?.ok) {
      return toast({
        title: 'Something went wrong',
        description: 'Your message was not sent, please try again',
        variant: 'destructive',
      });
    }

    textareaRef.current.value = '';
    router.refresh();
  };

  return (
    <Card>
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <Icons.user size={16} />
          <Link href={`/user/${user.id}`} className="text-sm">
            {user.name}
          </Link>
        </div>
        {isRateable && (
          <RatingDialog
            chat={activeChat!}
            user={user}
            currentUser={currentUser}
            listing={listing}
          />
        )}
      </div>
      <hr />
      {/* Listing INFO */}
      <div className="flex flex-col space-y-2 px-4 py-2">
        <div className="grid grid-cols-4 gap-6 sm:grid-cols-6">
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
            {/* MOBILE VIEW START */}
            <div className="flex items-center space-x-0.5 sm:hidden">
              <Icons.eye size={18} />
              <span className="text-foreground/75">{listing.views}</span>
            </div>
            <div className="flex items-center space-x-0.5 sm:hidden">
              <Icons.star size={18} />
              <span className="text-foreground/75">
                {listing.favorites.length}
              </span>
            </div>
            {/* MOBILE VIEW END */}
          </div>
          {/* Views and Stars */}
          <div className="hidden items-start space-x-3 py-1.5 sm:flex">
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
          <div className="hidden flex-col py-1.5 text-sm sm:flex">
            <p className="text-xs">
              {formatDistanceToNowStrict(new Date(listing.createdAt))} ago
            </p>
            <p className="text-foreground/80">{listing.location}</p>
          </div>
        </div>
      </div>
      <hr />
      {/* Chat window */}
      <div className="px-4 py-3">
        <Card className="flex h-96 flex-col-reverse gap-2 overflow-y-scroll bg-opacity-25 bg-chat-pattern-light px-4 py-2 dark:bg-chat-pattern-dark">
          {activeChat?.messages.map(item => (
            <Message
              key={item.id}
              {...item}
              isCurrentUserSender={currentUser.id === item.senderId}
            />
          ))}
        </Card>
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="px-4">
          <Textarea
            ref={textareaRef}
            className="h-20"
            placeholder="Write your message here"
          />
        </div>
        <div className="flex items-center justify-end px-4 py-3">
          <Button disabled={isLoading} type="submit" className="space-x-2">
            <Icons.send size={18} />
            <span>Send message</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};
