import Link from 'next/link';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { UserAuthSocials } from '@/components/user-auth-socials';
import { UserAuthForm } from '@/components/user-auth-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const LoginPage = () => {
  return (
    <Card className="flex w-full max-w-sm flex-col px-8 py-10">
      <CardTitle className="pb-1">Welcome back</CardTitle>
      <CardDescription className="pb-8">
        Sign in to continue to DealHub
      </CardDescription>
      <UserAuthSocials />
      <div className="relative mb-8 h-[1px] w-full bg-border">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs">
          or
        </div>
      </div>
      <UserAuthForm authType="login" />
      <p className="text-xs">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-indigo-500">
          Sign up
        </Link>{' '}
        instead.
      </p>
    </Card>
  );
};

export default LoginPage;
