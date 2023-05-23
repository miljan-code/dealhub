import { getCurrentUser, getSession } from '@/lib/session';
import { Categories } from '@/components/categories';
import { Menu } from '@/components/menu';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: UserLayoutProps) {
  const session = await getSession();
  const currentUser = await getCurrentUser();

  const notificationCount = currentUser?.notifications?.length || 0;

  return (
    <main className="mx-auto flex max-w-5xl gap-6 px-2 pb-8 pt-6">
      <aside className="flex w-44 flex-col space-y-4">
        <Menu notificationCount={notificationCount} session={session} />
        <Categories />
      </aside>
      <section className="flex-1">{children}</section>
    </main>
  );
}
