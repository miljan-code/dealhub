import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserAuthSocials } from '@/components/user-auth-socials';
import Link from 'next/link';

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
        <form className="flex flex-col space-y-3 pb-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username" className="text-xs">
              Username
            </Label>
            <Input type="text" id="username" placeholder="John Smith" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs">
              Email address
            </Label>
            <Input type="email" id="email" placeholder="example@mail.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-xs">
              Password
            </Label>
            <Input type="password" id="password" />
          </div>
          <Button type="submit">Continue</Button>
        </form>
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
