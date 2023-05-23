import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Icons } from '@/components/icons';
import { format } from 'date-fns';
import { MarkAsReadButton } from '@/components/client-buttons';

const NotificationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return notFound();

  if (!currentUser.notifications.length) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading className="mb-1">
          You don&apos;t have any new notification
        </EmptyState.Heading>
        <EmptyState.Text className="mb-3 w-1/2 text-center">
          We will inform you when there is something important
        </EmptyState.Text>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {currentUser.notifications.map(item => (
        <Card key={item.id} className="flex flex-col gap-2 px-3 py-2">
          <div className="flex items-center justify-between text-xs">
            <h2>{item.title}</h2>
            <span>{format(item.createdAt, 'dd. MM. yyyy')}</span>
          </div>
          <div className="bg-muted px-3 py-2 text-sm">
            <p>{item.description}</p>
          </div>
          <div className="flex items-center justify-end">
            <MarkAsReadButton notificationId={item.id}>
              Mark as read
            </MarkAsReadButton>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationsPage;
