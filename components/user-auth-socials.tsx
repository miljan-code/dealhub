'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const UserAuthSocials = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (provider: string) => {
    setIsLoading(true);

    signIn(provider).then(response => {
      setIsLoading(false);

      if (response?.error) {
        toast({
          title: response.error,
          description: 'You are not signed-in. Please, try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'You are successfuly signed in!',
        });
      }
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
