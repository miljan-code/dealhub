import { Icons } from '@/components/icons';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'DealHub',
  description: 'Find anything you need',
  mainNav: [
    {
      title: 'My Listings',
      href: '/my-listings',
      icon: Icons.folder,
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: Icons.message,
    },
    {
      title: 'Notifications',
      href: '/notifications',
      icon: Icons.bell,
    },
    {
      title: 'Ratings',
      href: '/ratings',
      icon: Icons.thumbsUp,
    },
    {
      title: 'Favorites',
      href: '/favorites',
      icon: Icons.star,
    },
  ],
};
