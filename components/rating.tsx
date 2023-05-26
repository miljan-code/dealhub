import { format } from 'date-fns';
import { Icons } from '@/components/icons';
import { getUserNameById } from '@/components/message-card';
import type { Listing, Rating as RatingType } from '@prisma/client';
import Link from 'next/link';

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
          <Link href={`/user/${authorId}`} className="text-sm">
            {author?.name}
          </Link>
        </div>
        <p className="text-xs">{format(createdAt, 'dd. MMM yyyy')}</p>
      </div>
      <h3 className="my-1.5">{listing.title}</h3>
      <div className="mb-2 flex flex-col text-sm sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-1 sm:flex-col sm:items-start sm:gap-0">
          <p className="text-foreground/75">Description was correct:</p>
          {description ? (
            <Icons.checkmark className="text-green-500" />
          ) : (
            <Icons.close className="text-red-500" />
          )}
        </div>
        <div className="flex flex-1 items-center gap-1 sm:flex-col sm:items-start sm:gap-0">
          <p className="text-foreground/75">Communication was smooth:</p>
          {communcation ? (
            <Icons.checkmark className="text-green-500" />
          ) : (
            <Icons.close className="text-red-500" />
          )}
        </div>
        <div className="flex flex-1 items-center gap-1 sm:flex-col sm:items-start sm:gap-0">
          <p className="text-foreground/75">Honored a promise:</p>
          {promise ? (
            <Icons.checkmark className="text-green-500" />
          ) : (
            <Icons.close className="text-red-500" />
          )}
        </div>
      </div>
      <div className="rounded-md bg-muted p-3">
        <p className="text-xs">{comment}</p>
      </div>
    </div>
  );
};
