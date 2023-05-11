import Link from 'next/link';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { UserAuthSocials } from '@/components/user-auth-socials';
import { UserRegisterForm } from '@/components/user-register-form';

const RegisterPage = () => {
  return (
    <section className="fixed inset-0 flex h-full w-full items-center justify-center bg-background">
      <Card className="flex w-full max-w-sm flex-col px-8 py-10">
        <CardTitle className="pb-1">Sign up</CardTitle>
        <CardDescription className="pb-8">
          To continue to DealHub
        </CardDescription>
        <UserAuthSocials />
        <div className="relative mb-8 h-[1px] w-full bg-border">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs">
            or
          </div>
        </div>
        <UserRegisterForm />
        <p className="text-xs">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-500">
            Sign in
          </Link>{' '}
          instead.
        </p>
      </Card>
    </section>
  );
};

export default RegisterPage;
