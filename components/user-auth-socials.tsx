'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export const UserAuthSocials = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (provider: string) => {
    setIsLoading(true);

    signIn(provider).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col space-y-2 pb-8">
      <Button
        onClick={() => handleSignIn('google')}
        variant="outline"
        className="space-x-4 px-10"
        disabled={isLoading}
      >
        <Icons.google className="h-4 w-4" />
        <span>Continue with Google</span>
      </Button>
      <Button
        onClick={() => handleSignIn('github')}
        variant="outline"
        className="space-x-4 px-10"
        disabled={isLoading}
      >
        <Icons.gitHub className="h-4 w-4" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};
