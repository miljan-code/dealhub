'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TwitterShareButton } from 'react-share';
import type { VariantProps } from 'class-variance-authority';

interface SendMessageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconSize?: number;
  children: React.ReactNode;
  authorId: string;
  listingId: number;
}

export const SendMessageButton: React.FC<SendMessageButtonProps> = ({
  size = 'default',
  variant = 'default',
  iconSize = 16,
  className,
  children,
  authorId,
  listingId,
  ...props
}) => {
  const router = useRouter();

  const handleSendMessage = () => {
    router.push(`/messages?userId=${authorId}&listingId=${listingId}`);
  };

  return (
    <Button
      onClick={handleSendMessage}
      variant={variant}
      size={size}
      className={cn('space-x-2', className)}
      {...props}
    >
      <Icons.message size={iconSize} />
      <span>{children}</span>
    </Button>
  );
};

interface AddToFavoritesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconSize?: number;
  listingId: number;
  isFavorited: boolean;
}

export const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
  size = 'default',
  variant = 'default',
  iconSize = 16,
  className,
  listingId,
  isFavorited,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleFavorites = async () => {
    setIsLoading(true);

    try {
      if (isFavorited) {
        await fetch(`/api/favorite/${listingId}`, {
          method: 'DELETE',
        });
      } else {
        await fetch('/api/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listingId,
          }),
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong!',
      });
    }

    router.refresh();
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleFavorites}
      className={cn('space-x-2', className)}
      size={size}
      variant={variant}
      disabled={isLoading}
      {...props}
    >
      {isFavorited ? (
        <Icons.starOff size={iconSize} />
      ) : (
        <Icons.star size={iconSize} />
      )}
      <span>{isFavorited ? 'Remove' : 'Favorite'}</span>
    </Button>
  );
};

interface DeleteListingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconSize?: number;
  listingId: number;
  children: React.ReactNode;
}

export const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({
  size = 'default',
  variant = 'default',
  iconSize = 16,
  className,
  listingId,
  children,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDeleteListing = async () => {
    setIsLoading(true);

    try {
      await fetch(`/api/listing/${listingId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong!',
      });
    }

    router.refresh();
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn('space-x-2', className)}
          size={size}
          variant={variant}
          disabled={isLoading}
          {...props}
        >
          <Icons.close size={iconSize} />
          <span>{children}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            listing and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteListing}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface MarkAsReadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  notificationId: number;
  children: React.ReactNode;
}

export const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({
  size = 'xs',
  variant = 'outline',
  className,
  children,
  notificationId,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleMarkAsRead = async () => {
    setIsLoading(true);

    try {
      await fetch(`/api/notification/${notificationId}`, {
        method: 'DELETE',
      });

      router.refresh();
    } catch (error) {
      // TODO: handle errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleMarkAsRead}
      variant={variant}
      size={size}
      className={cn('space-x-2', className)}
      disabled={isLoading}
      {...props}
    >
      <span>{children}</span>
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button
      variant="ghost"
      size="xs"
      className="justify-start space-x-2 text-xs"
      onClick={() => signOut()}
    >
      <Icons.logout size={14} />
      <span>Sign out</span>
    </Button>
  );
};

interface ShareButtonProps {
  slug: string;
}

export const ShareButton = ({ slug }: ShareButtonProps) => {
  return (
    // TODO: change this hardcoded url
    <TwitterShareButton url={`https://dealhub.miljan.xyz${slug}`}>
      <Button className="w-full space-x-2" size="sm" variant="outline">
        <Icons.share size={16} />
        <span>Share</span>
      </Button>
    </TwitterShareButton>
  );
};
