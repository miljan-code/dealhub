'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { rateUserSchema } from '@/lib/validations/rate-user';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type {
  ChatWithListingAndMessages,
  ListingWithImageAndFavorites,
} from '@/components/chatbox';
import type { User } from '@prisma/client';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { setCustomValue } from '@/lib/utils';
import { toast } from './ui/use-toast';

interface RatingDialogProps {
  chat: ChatWithListingAndMessages;
  user: User;
  currentUser: User;
  listing: ListingWithImageAndFavorites;
}

type FormData = z.infer<typeof rateUserSchema>;

export const RatingDialog: React.FC<RatingDialogProps> = ({
  chat,
  user,
  currentUser,
  listing,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(rateUserSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const res = await fetch('/api/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        chatId: chat.id,
        listingId: listing.id,
        authorId: currentUser.id,
        ratedUserId: user.id,
      }),
    });

    setIsLoading(false);

    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: 'Your rating was not registered, please try again',
        variant: 'destructive',
      });
    }

    if (res?.ok) {
      router.push(`/user/${user.id}`);
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1">
          <Icons.thumbUp size={16} />
          <span className="text-sm">Rate user</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add rating for {user.name}</DialogTitle>
          <DialogDescription>
            Users can be rated only once for each listing communication.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="communication">Communication was good</Label>
            <Select
              onValueChange={value =>
                setCustomValue(
                  'communication',
                  value === 'yes' ? true : false,
                  setValue
                )
              }
            >
              <SelectTrigger id="communication">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
            {errors?.communication?.message && (
              <p className="px-1 text-xs text-red-600">
                {errors.communication.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description of item was corect</Label>
            <Select
              onValueChange={value =>
                setCustomValue(
                  'description',
                  value === 'yes' ? true : false,
                  setValue
                )
              }
            >
              <SelectTrigger id="description">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
            {errors?.description?.message && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="honored">User has honored a promise</Label>
            <Select
              onValueChange={value =>
                setCustomValue(
                  'honored',
                  value === 'yes' ? true : false,
                  setValue
                )
              }
            >
              <SelectTrigger id="honored">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
            {errors?.honored?.message && (
              <p className="px-1 text-xs text-red-600">
                {errors.honored.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">Additional comment</Label>
            <Textarea {...register('comment')} />
            {errors.comment?.message && (
              <p className="text-xs text-red-600">{errors.comment.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            Rate user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
