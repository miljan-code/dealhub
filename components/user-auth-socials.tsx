'use client';

import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export const UserAuthSocials = () => {
  return (
    <div className="flex flex-col space-y-2 pb-8">
      <Button
        onClick={() => signIn('google')}
        variant="outline"
        className="space-x-4 px-10"
      >
        <Icons.google className="h-4 w-4" />
        <span>Continue with Google</span>
      </Button>
      <Button
        onClick={() => signIn('github')}
        variant="outline"
        className="space-x-4 px-10"
      >
        <Icons.gitHub className="h-4 w-4" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};
