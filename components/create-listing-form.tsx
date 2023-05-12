'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListingSchema } from '@/lib/validations/create-listing';
import { Card } from '@/components/ui/card';
import type { User } from 'next-auth';

interface CreateListingFormProps {
  currentUser: Pick<User, 'name' | 'email' | 'image'>;
}

export const CreateListingForm: React.FC<CreateListingFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createListingSchema),
  });

  return <Card className="px-4 py-3">CreateListingForm</Card>;
};
