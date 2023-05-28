import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { CreateListingForm } from '@/components/create-listing-form';

export const metadata = {
  title: 'Sell something',
  description: 'List an item in less than a minute and start selling',
};

const CreatePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return notFound();

  return <CreateListingForm currentUser={currentUser} />;
};

export default CreatePage;
