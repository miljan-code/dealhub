import '@/styles/globals.css';
import { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { getSession } from '@/lib/session';
import { cn } from '@/lib/utils';
import { CategoriesAside } from '@/components/categories-aside';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: {
    default: 'DealHub — Find anything you need',
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen">
            <Header />
            <main className="mx-auto flex max-w-5xl gap-6 px-2 pb-8 pt-6">
              <aside className="flex w-44 flex-col space-y-4">
                <Sidebar session={session} />
                <CategoriesAside />
              </aside>
              <div className="flex-1">{children}</div>
            </main>
          </div>
          <div className="absolute bottom-5 right-5">
            <ThemeToggle />
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
