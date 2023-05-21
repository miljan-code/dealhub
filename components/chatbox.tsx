'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { siteConfig } from '@/config/site';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Message } from '@/components/message';
import type {
  Chat,
  Favorite,
  Listing,
  ListingImage,
  Message as MessageType,
  Rating,
  User,
} from '@prisma/client';
import { RatingDialog } from './rating-dialog';

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

    // TODO: do this check on server also!
    return userIds.every(id => chatParticipantIds.includes(id));
  }, [currentUser.id, user.id, activeChat]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const message = textareaRef.current?.value;

    if (!message) return null;

    setIsLoading(true);

    try {
      await fetch('/api/send-message', {
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

      textareaRef.current.value = '';
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
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
        <Card className="flex h-96 flex-col-reverse gap-2 overflow-y-scroll px-4 py-2">
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
