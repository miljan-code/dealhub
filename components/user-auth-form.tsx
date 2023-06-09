'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { userRegisterSchema, userLoginSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

type RegisterSchema = z.infer<typeof userRegisterSchema>;
type LoginSchema = z.infer<typeof userLoginSchema>;
type FormData = RegisterSchema & LoginSchema;

interface UserAuthFormProps {
  authType: 'login' | 'register';
}

export const UserAuthForm = ({ authType }: UserAuthFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      authType === 'login' ? userLoginSchema : userRegisterSchema
    ),
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (authType === 'register') {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setIsLoading(false);
        if (res.status === 409) {
          return toast({
            title: 'Email address already in use',
            description: 'Please enter another address or try to login',
            variant: 'destructive',
          });
        }

        return toast({
          title: 'Something went wrong.',
          description: 'Your account was not created. Please, try again.',
          variant: 'destructive',
        });
      }
    }

    signIn('credentials', {
      ...formData,
      redirect: false,
    }).then(response => {
      setIsLoading(false);

      if (response?.error) {
        toast({
          title: response.error,
          description: 'You are not signed-in. Please, try again.',
          variant: 'destructive',
        });
      } else {
        router.refresh();
        router.push('/');
        toast({
          title: 'You are successfuly logged in!',
        });
      }
    });
  };

  return (
    <form
      className="flex flex-col space-y-3 pb-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {authType === 'register' && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username" className="text-xs">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="John Smith"
            {...register('username')}
          />
          {errors?.username && (
            <p className="px-1 text-xs text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-xs">
          Email address
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="example@mail.com"
          {...register('email')}
        />
        {errors?.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-xs">
          Password
        </Label>
        <Input type="password" id="password" {...register('password')} />
        {errors?.password && (
          <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>
      <Button disabled={isLoading} type="submit">
        {isLoading ? <Icons.loader className="animate-spin" /> : 'Continue'}
      </Button>
    </form>
  );
};
