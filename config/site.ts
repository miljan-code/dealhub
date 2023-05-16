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
      icon: Icons.thumbUp,
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
      href: '?category=collectibles',
      label: 'Collectibles',
      icon: Icons.layout,
      value: 'collectibles'
    },
    { 
      href: '?category=electronics',
      label: 'Electronics',
      icon: Icons.laptop,
      value: 'electronics' 
    },
    { 
      href: '?category=fashion',
      label: 'Fashion',
      icon: Icons.shirt,
      value: 'fashion'
    },
    { 
      href: '?category=home-and-garden',
      label: 'Home',
      icon: Icons.home,
      value: 'home'
    },
    { 
      href: '?category=cars',
      label: 'Cars',
      icon: Icons.car,
      value: 'cars'
    },
    { 
      href: '?category=music',
      label: 'Music',
      icon: Icons.music,
      value: 'music'
    },
    { 
      href: '?category=sports',
      label: 'Sports',
      icon: Icons.bike,
      value: 'sports'
    },
    { 
      href: '?category=toys',
      label: 'Toys',
      icon: Icons.baby,
      value: 'toys'
    },
    { 
      href: '?category=gaming',
      label: 'Gaming',
      icon: Icons.gamepad,
      value: 'gaming'
    },
  ],
  maxImagesUpload: 5,
};
