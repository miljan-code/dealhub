'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchProps {
  listingsCount?: number;
  rounded?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  listingsCount,
  rounded = true,
}) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!inputRef.current) return null;

    const searchTerm = inputRef.current.value;

    router.push(`/?term=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder={
          !!listingsCount
            ? `Anything you want... (${listingsCount} listings)`
            : 'Anything you want...'
        }
        className={cn({
          'rounded-md': rounded,
          'rounded-none': !rounded,
        })}
      />
      <Button
        type="submit"
        variant="secondary"
        className={cn('absolute bottom-0 right-0', {
          'rounded-md': rounded,
          'rounded-none': !rounded,
        })}
      >
        <Icons.search />
      </Button>
    </form>
  );
};
