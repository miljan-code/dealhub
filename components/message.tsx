import Image from 'next/image';
import type { Message as MessageType, User } from '@prisma/client';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type MessageWithSender = MessageType & { sender: User };

interface MessageProps extends MessageWithSender {
  isCurrentUserSender: boolean;
}

export const Message: React.FC<MessageProps> = ({
  createdAt,
  message,
  sender,
  isCurrentUserSender,
}) => {
  return (
    <div
      className={cn(
        'flex w-fit max-w-xs gap-3 rounded-md bg-accent px-4 py-2',
        {
          'self-end': isCurrentUserSender,
          'self-start': !isCurrentUserSender,
        }
      )}
    >
      <div className="relative h-8 w-8 overflow-hidden rounded-full">
        <Image
          src={sender.image || siteConfig.userPlaceholder}
          alt={sender.name}
          fill
        />
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-sm">{message}</span>
        <span className="text-xs text-foreground/50">
          {format(createdAt, 'dd.MM.yy hh:ss')}
        </span>
      </div>
    </div>
  );
};
