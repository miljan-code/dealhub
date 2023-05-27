'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { TwitterShareButton } from 'react-share';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
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

    let res: Response;

    if (isFavorited) {
      res = await fetch(`/api/favorite/${listingId}`, {
        method: 'DELETE',
      });
    } else {
      res = await fetch('/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId,
        }),
      });
    }

    setIsLoading(false);

    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: 'Operation was unsuccessful, please try again',
        variant: 'destructive',
      });
    }

    if (res?.ok) {
      router.refresh();
    }
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
  onDropdownClose?: () => void;
}

export const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({
  size = 'default',
  variant = 'default',
  iconSize = 16,
  className,
  listingId,
  children,
  onDropdownClose,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDeleteListing = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/listing/${listingId}`, {
      method: 'DELETE',
    });

    setIsLoading(false);

    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: 'Listing is not deleted, please try again',
        variant: 'destructive',
      });
    }

    if (res?.ok) {
      onDropdownClose?.();
      router.refresh();
    }
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

    const res = await fetch(`/api/notification/${notificationId}`, {
      method: 'DELETE',
    });

    setIsLoading(false);

    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: 'Notification was not marked as read, please try again',
        variant: 'destructive',
      });
    }

    router.refresh();
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

interface SignOutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconSize?: number;
}

export const SignOutButton = ({
  className,
  iconSize = 14,
  ...props
}: SignOutButtonProps) => {
  return (
    <Button
      className={cn('justify-start space-x-2 text-xs', className)}
      onClick={() => signOut()}
      {...props}
    >
      <Icons.logout size={iconSize} />
      <span>Sign out</span>
    </Button>
  );
};

interface ShareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  slug: string;
}

export const ShareButton = ({
  slug,
  className,
  ...props
}: ShareButtonProps) => {
  return (
    <TwitterShareButton
      url={`${siteConfig.url}${slug}`}
      className={cn('hidden sm:block', className)}
      {...props}
    >
      <div
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'w-full space-x-2'
        )}
      >
        <Icons.share size={16} />
        <span>Share</span>
      </div>
    </TwitterShareButton>
  );
};
