import { Categories } from '@/components/categories';
import { Menu } from '@/components/menu';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="mx-auto flex max-w-5xl gap-6 px-2 pb-8 pt-6">
      <aside className="hidden w-44 flex-col space-y-4 md:flex">
        {/* @ts-expect-error */}
        <Menu />
        <Categories />
      </aside>
      <div className="flex-1">{children}</div>
    </main>
  );
}
