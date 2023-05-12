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
  // prettier-ignore
  categories: [
    {
      href: '/category/collectibles',
      label: 'Collectibles',
      icon: Icons.layout,
    },
    { 
      href: '/category/electronics',
      label: 'Electronics',
      icon: Icons.laptop 
    },
    { 
      href: '/category/fashion',
      label: 'Fashion',
      icon: Icons.shirt
    },
    { 
      href: '/category/home-and-garden',
      label: 'Home',
      icon: Icons.home
    },
    { 
      href: '/category/cars',
      label: 'Cars',
      icon: Icons.car
    },
    { 
      href: '/category/music',
      label: 'Music',
      icon: Icons.music
    },
    { 
      href: '/category/sports',
      label: 'Sports',
      icon: Icons.bike
    },
    { 
      href: '/category/toys',
      label: 'Toys',
      icon: Icons.baby
    },
    { 
      href: '/category/gaming',
      label: 'Gaming',
      icon: Icons.gamepad
    },
  ],
};
