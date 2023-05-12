import { getCurrentUser } from '@/lib/session';
import { CreateListingForm } from '@/components/create-listing-form';

const CreatePage = async () => {
  const currentUser = await getCurrentUser();

  return <CreateListingForm currentUser={currentUser} />;
};

export default CreatePage;
