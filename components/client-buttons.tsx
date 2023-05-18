'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
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
  children: React.ReactNode;
}

export const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
  size = 'default',
  variant = 'default',
  iconSize = 16,
  className,
  children,
  ...props
}) => {
  const handleAddToFavorites = () => {};

  return (
    <Button
      onClick={handleAddToFavorites}
      className={cn('space-x-2', className)}
      size={size}
      variant={variant}
      {...props}
    >
      <Icons.star size={iconSize} />
      <span>{children}</span>
    </Button>
  );
};

interface DeleteListingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconSize?: number;
  children: React.ReactNode;
}

export const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({
  size = 'default',
  variant = 'default',
  iconSize = 16,
  className,
  children,
  ...props
}) => {
  const handleDeleteListing = () => {};

  return (
    <Button
      onClick={handleDeleteListing}
      className={cn('space-x-2', className)}
      size={size}
      variant={variant}
      {...props}
    >
      <Icons.close size={iconSize} />
      <span>{children}</span>
    </Button>
  );
};
