'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchProps {
  listingsCount: number;
}

export const Search: React.FC<SearchProps> = ({ listingsCount }) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!inputRef.current) return null;

    const searchTerm = inputRef.current.value;

    router.push(`/?term=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1">
      <Input
        ref={inputRef}
        type="text"
        placeholder={`Anything you want... (${listingsCount} listings)`}
      />
      <Button
        type="submit"
        variant="secondary"
        className="absolute bottom-0 right-0"
      >
        <Icons.search />
      </Button>
    </form>
  );
};
