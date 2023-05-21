import { format } from 'date-fns';
import { Icons } from '@/components/icons';
import { getUserNameById } from '@/components/message-card';
import type { Listing, Rating as RatingType } from '@prisma/client';

interface RatingProps extends RatingType {
  listing: Listing;
}

export const Rating = async ({
  overallRating,
  authorId,
  createdAt,
  listing,
  communcation,
  description,
  promise,
  comment,
}: RatingProps) => {
  const author = await getUserNameById(authorId);

  return (
    <div className="mb-1 flex flex-col px-3 py-2">
      <div className="flex items-center justify-between space-y-3">
        <div className="flex items-center space-x-2">
          {overallRating ? (
            <Icons.thumbUp size={16} className="text-green-500" />
          ) : (
            <Icons.thumbDown size={16} className="text-red-500" />
          )}
          <span className="text-sm">{author?.name}</span>
        </div>
        <p className="text-xs">{format(createdAt, 'dd. MMM yyyy')}</p>
      </div>
      <h3 className="my-1.5">{listing.title}</h3>
      <div className="mb-2 flex items-center text-sm">
        <div className="flex flex-1 flex-col">
          <p className="text-foreground/75">Description was correct:</p>
          {description ? <Icons.checkmark /> : <Icons.close />}
        </div>
        <div className="flex flex-1 flex-col">
          <p className="text-foreground/75">Communication was smooth:</p>
          {communcation ? <Icons.checkmark /> : <Icons.close />}
        </div>
        <div className="flex flex-1 flex-col">
          <p className="text-foreground/75">Honored a promise:</p>
          {promise ? <Icons.checkmark /> : <Icons.close />}
        </div>
      </div>
      <div className="rounded-md bg-muted p-3">
        <p className="text-xs">{comment}</p>
      </div>
    </div>
  );
};
