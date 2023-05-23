'use client';

import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Navigation } from '@/components/navigation';

export const NoAuthSidebar = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/login')}
      className="relative cursor-pointer"
    >
      <div className="absolute inset-0 h-full w-full backdrop-blur-[2px]" />
      <Navigation items={siteConfig.mainNav} />
    </div>
  );
};
