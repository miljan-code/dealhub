import { Categories } from '@/components/categories';
import { Menu } from '@/components/menu';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <main className="mx-auto flex max-w-5xl gap-6 px-2 pb-8 pt-6">
      <aside className="hidden w-44 flex-col space-y-4 md:flex">
        {/* @ts-expect-error */}
        <Menu />
        <Categories />
      </aside>
      <section className="flex-1">{children}</section>
    </main>
  );
}
