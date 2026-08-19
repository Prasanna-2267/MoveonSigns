import type { NavItem } from '../types';

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Shop All',
    path: '/collections/all-products'
  },
  {
    label: 'Shop Signage',
    path: '/collections/signage',
    dropdown: [
      {
        title: 'Signage Collections',
        items: [
          { label: 'All Signage', path: '/collections/signage' },
          { label: 'Round Signs', path: '/collections/signage?category=Round', tag: 'Bestseller' },
          { label: 'A-Frame Sidewalk Signs', path: '/collections/signage?category=A-Frame' },
          { label: 'Blade Signs', path: '/collections/blade-signs' },
          { label: 'Outdoor Signs', path: '/collections/outdoor-signs' },
          { label: 'Tabletop Signs', path: '/collections/tabletop-signs' }
        ]
      }
    ]
  },
  {
    label: 'Shop Menu Displays',
    path: '/collections/menu-displays',
    dropdown: [
      {
        title: 'Menu Displays',
        items: [
          { label: 'All Menu Displays', path: '/collections/menu-displays' },
          { label: 'Letter Board Displays', path: '/collections/letter-menu-board-displays', tag: 'Popular' },
          { label: 'Peg Letter Boards', path: '/collections/menu-displays?type=Peg Board' },
          { label: 'Paper Rollers', path: '/collections/menu-displays?type=Paper Roller' },
          { label: 'Curve Tabletop Menus', path: '/collections/tabletop-signs' }
        ]
      }
    ]
  },
  {
    label: 'Shop Furniture',
    path: '/collections/furniture',
    dropdown: [
      {
        title: 'Furniture & Displays',
        items: [
          { label: 'All Furniture', path: '/collections/furniture' },
          { label: 'Wall Mounted Cafe Tables', path: '/collections/furniture?type=Table' },
          { label: 'Counter Display Cases', path: '/collections/counter-display-cases', tag: 'New' },
          { label: 'Standing Sign Holders', path: '/collections/furniture?type=Sign Holder' }
        ]
      }
    ]
  }
];

export const FOOTER_LINKS = {
  shop: [
    { label: 'Shop All', path: '/collections/all-products' },
    { label: 'Best Sellers', path: '/collections/best-sellers' },
    { label: 'Signage', path: '/collections/signage' },
    { label: 'Menu Displays', path: '/collections/menu-displays' },
    { label: 'Furniture', path: '/collections/furniture' }
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Journal / Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ],
  support: [
    { label: "FAQ's", path: '/faq' },
    { label: 'Shipping', path: '/shipping' },
    { label: 'Returns & Warranty', path: '/returns' }
  ],
  legal: [
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' }
  ]
};
