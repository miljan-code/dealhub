import { getSession } from '@/lib/session';
import { CategoriesAside } from '@/components/categories-aside';
import { Sidebar } from '@/components/sidebar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const session = await getSession();

  return (
    <main className="mx-auto flex max-w-5xl gap-6 px-2 pb-8 pt-6">
      <aside className="flex w-44 flex-col space-y-4">
        <Sidebar session={session} />
        <CategoriesAside />
      </aside>
      <div className="flex-1">{children}</div>
    </main>
  );
}
