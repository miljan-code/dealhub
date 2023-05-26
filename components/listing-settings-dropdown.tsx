'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { DeleteListingButton } from './client-buttons';
import { useState } from 'react';

interface ListingSettingsDropdownProps {
  listingId: number;
}

export const ListingSettingsDropdown = ({
  listingId,
}: ListingSettingsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:hidden">
      <DropdownMenu onOpenChange={() => setIsOpen(true)}>
        <DropdownMenuTrigger>
          <div
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'xs' }),
              'cursor-pointer space-x-1 text-xs font-normal'
            )}
          >
            <Icons.settings size={14} />
            <span>Settings</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuItem>
            <Link
              href={`/listing/${listingId}`}
              className="flex items-center gap-1"
            >
              <Icons.link size={14} />
              <span>Open</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.pencil size={14} />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={e => e.preventDefault()}>
            <DeleteListingButton
              variant="ghost"
              listingId={listingId}
              iconSize={14}
              className="h-fit w-full justify-start space-x-1 p-0 hover:bg-transparent"
            >
              Delete
            </DeleteListingButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
