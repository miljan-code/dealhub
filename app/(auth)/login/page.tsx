import Link from 'next/link';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { UserLoginForm } from '@/components/user-login-form';
import { UserAuthSocials } from '@/components/user-auth-socials';

const LoginPage = () => {
  return (
    <section className="fixed inset-0 flex h-full w-full items-center justify-center bg-background">
      <Card className="flex w-full max-w-sm flex-col px-8 py-10">
        <CardTitle className="pb-1">Sign In</CardTitle>
        <CardDescription className="pb-8">
          To continue to DealHub
        </CardDescription>
        <UserAuthSocials />
        <div className="relative mb-8 h-[1px] w-full bg-border">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs">
            or
          </div>
        </div>
        <UserLoginForm />
        <p className="text-xs">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-indigo-500">
            Sign up
          </Link>{' '}
          instead.
        </p>
      </Card>
    </section>
  );
};

export default LoginPage;
