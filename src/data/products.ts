import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'bakery-display-case-pro',
    name: 'Bakery Display Case Pro',
    subtitle: 'Available for Preorder',
    price: 34990,
    costPrice: 17500, // Internal manufacturing / making cost
    compareAtPrice: 38990,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Counter Display Cases',
    collections: ['all-products', 'best-sellers', 'furniture', 'counter-display-cases'],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 38,
    tags: ['Glass', 'Bakeries', 'Display Case', 'Countertop', 'New'],
    description: 'The Bakery Display Case Pro is a high-clarity architectural countertop display case engineered for bakeries, pastry shops, and boutique cafes across India. Crafted from toughened glass and powder-coated steel rails with magnetic soft-close doors.',
    materials: 'High-clarity toughened glass, 304 powder-coated stainless steel, solid oak base trim.',
    dimensions: 'Height: 480mm | Width: 650mm | Depth: 400mm | Weight: 14.2kg',
    shippingInfo: 'Ships securely packaged via express courier across India. Dispatch within 2-3 business days.',
    returnInfo: '30-day trial return policy with full replacement warranty.',
    specifications: [
      { label: 'Glass Clarity', value: 'Ultra-clear low-iron toughened glass' },
      { label: 'Doors', value: 'Dual rear soft-close magnetic doors' },
      { label: 'Weight Capacity', value: '15kg per tier' },
      { label: 'Finish', value: 'Matte Forest Green / Satin Black' }
    ],
    variants: [
      { id: 'v-bdcp-black', name: 'Satin Black / Medium', sku: 'BDCP-BLK-M', price: 34990, costPrice: 17500, compareAtPrice: 38990, stock: 12, attributes: { Finish: 'Satin Black', Size: 'Medium' } },
      { id: 'v-bdcp-green', name: 'Forest Green / Medium', sku: 'BDCP-GRN-M', price: 34990, costPrice: 17500, compareAtPrice: 38990, stock: 8, attributes: { Finish: 'Forest Green', Size: 'Medium' } },
      { id: 'v-bdcp-oak', name: 'Natural Oak / Large', sku: 'BDCP-OAK-L', price: 37990, costPrice: 19000, compareAtPrice: 41990, stock: 5, attributes: { Finish: 'Natural Oak', Size: 'Large' } }
    ]
  },
  {
    id: 'prod-2',
    slug: 'three-tier-bakery-display-case',
    name: 'Three Tier Bakery Display Case',
    price: 24990,
    costPrice: 12800,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Counter Display Cases',
    collections: ['all-products', 'best-sellers', 'counter-display-cases', 'furniture'],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 29,
    tags: ['Display', 'Bakery', 'Tiered', 'Counter'],
    description: 'Maximize counter space with three tiered glass shelves designed for pastries, artisanal breads, and sweets. Features open front access for rapid customer service.',
    materials: 'Tempered glass shelves, aluminum frame.',
    dimensions: 'Height: 520mm | Width: 450mm | Depth: 350mm',
    variants: [
      { id: 'v-3tbdc-blk', name: 'Black Steel', sku: '3TBDC-BLK', price: 24990, costPrice: 12800, stock: 15, attributes: { Finish: 'Black Steel' } },
      { id: 'v-3tbdc-wht', name: 'White Steel', sku: '3TBDC-WHT', price: 24990, costPrice: 12800, stock: 9, attributes: { Finish: 'White Steel' } }
    ]
  },
  {
    id: 'prod-3',
    slug: 'standing-round-sign',
    name: 'Standing Round Sign',
    price: 14990,
    costPrice: 6200,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'best-sellers', 'signage', 'restaurant-signage'],
    isBestseller: true,
    rating: 5.0,
    reviewCount: 54,
    tags: ['Round', 'Standing', 'Signage', 'Sidewalk'],
    description: 'An elegant freestanding circular sign post by Moveon Signs. Perfect for boutique entrances, cafes, retail studios, and interior directional signage.',
    materials: 'Powder-coated aluminum disc, heavy iron base plate.',
    dimensions: 'Disc Diameter: 400mm | Total Height: 1100mm',
    variants: [
      { id: 'v-srs-blk', name: 'Matte Black', sku: 'SRS-BLK', price: 14990, costPrice: 6200, stock: 20, attributes: { Finish: 'Matte Black' } },
      { id: 'v-srs-wht', name: 'Off-White', sku: 'SRS-WHT', price: 14990, costPrice: 6200, stock: 14, attributes: { Finish: 'Off-White' } }
    ]
  },
  {
    id: 'prod-4',
    slug: 'wall-mounted-cafe-table',
    name: 'Wall Mounted Cafe Table',
    price: 11490,
    costPrice: 5100,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Furniture',
    collections: ['all-products', 'furniture'],
    rating: 4.7,
    reviewCount: 22,
    tags: ['Table', 'Cafe', 'Wall Mounted', 'Furniture'],
    description: 'Space-saving floating wall table crafted from solid ash wood and steel bracket supports. Designed for coffee bars and cozy dining corners.',
    materials: 'Solid Ash timber, powder-coated steel bracket.',
    dimensions: 'Top Diameter: 500mm | Depth from wall: 530mm',
    variants: [
      { id: 'v-wmct-natural', name: 'Natural Ash / Black Bracket', sku: 'WMCT-ASH', price: 11490, costPrice: 5100, stock: 10, attributes: { Wood: 'Natural Ash' } },
      { id: 'v-wmct-dark', name: 'Walnut Finish / Black Bracket', sku: 'WMCT-WAL', price: 12490, costPrice: 5600, stock: 6, attributes: { Wood: 'Walnut' } }
    ]
  },
  {
    id: 'prod-5',
    slug: 'opening-hours-sign',
    name: 'Opening Hours Sign',
    price: 4490,
    costPrice: 1600,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'signage', 'restaurant-signage', 'tabletop-signs'],
    rating: 4.9,
    reviewCount: 41,
    tags: ['Hours', 'Wall Sign', 'Vinyl', 'Customizable'],
    description: 'Minimalist acrylic board with customizable letter decals for displaying store hours, contact info, and social handles.',
    materials: 'Matte acrylic disc with weather-resistant vinyl lettering kit included.',
    dimensions: 'Diameter: 300mm | Thickness: 4mm',
    variants: [
      { id: 'v-ohs-blk', name: 'Black Acrylic', sku: 'OHS-BLK', price: 4490, costPrice: 1600, stock: 30, attributes: { Color: 'Black' } },
      { id: 'v-ohs-wht', name: 'White Acrylic', sku: 'OHS-WHT', price: 4490, costPrice: 1600, stock: 25, attributes: { Color: 'White' } }
    ]
  },
  {
    id: 'prod-6',
    slug: 'a-frame-sign',
    name: 'A-Frame Sign',
    price: 13990,
    costPrice: 5800,
    compareAtPrice: 16990,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'best-sellers', 'signage'],
    isBestseller: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ['A-Frame', 'Sidewalk', 'Outdoor', 'Sale'],
    description: 'The signature Moveon Signs aluminum A-Frame sidewalk sign. Durable, wind-resistant, and styled for clean street-level branding.',
    materials: 'Powder-coated aluminum alloy frame and faceplates.',
    dimensions: 'Height: 850mm | Width: 600mm | Weight: 8.5kg',
    variants: [
      { id: 'v-afs-blk', name: 'Black Powdercoat', sku: 'AFS-BLK', price: 13990, costPrice: 5800, compareAtPrice: 16990, stock: 18, attributes: { Color: 'Black' } },
      { id: 'v-afs-wht', name: 'White Powdercoat', sku: 'AFS-WHT', price: 13990, costPrice: 5800, compareAtPrice: 16990, stock: 12, attributes: { Color: 'White' } }
    ]
  },
  {
    id: 'prod-7',
    slug: 'round-sign',
    name: 'Round Sign',
    price: 10990,
    costPrice: 4500,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'best-sellers', 'signage', 'blade-signs'],
    isBestseller: true,
    rating: 5.0,
    reviewCount: 88,
    tags: ['Blade Sign', 'Wall Mount', 'Round', 'Storefront'],
    description: 'Outdoor double-sided wall-mounted round blade sign. High visibility for pedestrian traffic approaching from both directions.',
    materials: 'Aluminum faceplate with heavy duty mounting bracket.',
    dimensions: 'Disc Diameter: 460mm | Bracket Projection: 540mm',
    variants: [
      { id: 'v-rs-blk', name: 'Black / 460mm', sku: 'RS-BLK-460', price: 10990, costPrice: 4500, stock: 22, attributes: { Color: 'Black' } },
      { id: 'v-rs-wht', name: 'White / 460mm', sku: 'RS-WHT-460', price: 10990, costPrice: 4500, stock: 17, attributes: { Color: 'White' } }
    ]
  },
  {
    id: 'prod-8',
    slug: 'open-closed-sign',
    name: 'Open / Closed Sign',
    price: 3490,
    costPrice: 1200,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'signage', 'tabletop-signs'],
    rating: 4.7,
    reviewCount: 19,
    tags: ['Door Sign', 'Open Closed', 'Hanging'],
    description: 'Dual-sided reversible door sign crafted from solid beech wood and brass chain hardware.',
    materials: 'Solid beech wood, brass hanging chain and suction hook.',
    dimensions: 'Width: 220mm | Height: 120mm',
    variants: [
      { id: 'v-ocs-beech', name: 'Natural Beech', sku: 'OCS-BCH', price: 3490, costPrice: 1200, stock: 40, attributes: { Material: 'Beech Wood' } }
    ]
  },
  {
    id: 'prod-9',
    slug: 'standing-sign-holder',
    name: 'Standing Sign Holder',
    price: 7990,
    costPrice: 3100,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Furniture',
    collections: ['all-products', 'furniture', 'signage'],
    rating: 4.8,
    reviewCount: 15,
    tags: ['Holder', 'Standing', 'Poster'],
    description: 'Slender freestanding metallic sign holder designed for holding printed menu boards, poster cards, and directional notices.',
    materials: 'Steel rod, weighted cast base.',
    dimensions: 'Height: 1200mm | Slot Width: 300mm',
    variants: [
      { id: 'v-ssh-blk', name: 'Matte Black', sku: 'SSH-BLK', price: 7990, costPrice: 3100, stock: 11, attributes: { Finish: 'Matte Black' } }
    ]
  },
  {
    id: 'prod-10',
    slug: 'peg-letter-board',
    name: 'Peg Letter Board',
    price: 11990,
    costPrice: 4900,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Menu Displays',
    collections: ['all-products', 'best-sellers', 'menu-displays', 'letter-menu-board-displays'],
    isBestseller: true,
    rating: 4.9,
    reviewCount: 73,
    tags: ['Peg Board', 'Letter Board', 'Menu', 'Wooden'],
    description: 'A wooden peg menu board system with press-in letters. Perfect for daily coffee menu specials, drink prices, and announcement boards.',
    materials: 'Natural Birch plywood backing with 400+ press-fit plastic letters included.',
    dimensions: 'Board Height: 800mm | Width: 600mm',
    variants: [
      { id: 'v-plb-birch', name: 'Birch Plywood / White Letters', sku: 'PLB-BIR-WHT', price: 11990, costPrice: 4900, stock: 25, attributes: { Board: 'Natural Birch' } }
    ]
  },
  {
    id: 'prod-11',
    slug: 'poster-sidewalk-sign',
    name: 'Poster Sidewalk Sign',
    price: 13490,
    costPrice: 5500,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'signage'],
    rating: 4.6,
    reviewCount: 14,
    tags: ['Poster', 'Sidewalk', 'A-Frame'],
    description: 'Quick-change magnetic poster frame sidewalk sign. Swap promotional printed graphics in seconds.',
    materials: 'Magnetic acrylic cover, aluminum A-frame.',
    dimensions: 'Poster size: A2 (420 x 594mm)',
    variants: [
      { id: 'v-pss-blk', name: 'Black Frame', sku: 'PSS-BLK', price: 13490, costPrice: 5500, stock: 8, attributes: { Color: 'Black' } }
    ]
  },
  {
    id: 'prod-12',
    slug: 'letter-sidewalk-sign',
    name: 'Letter Sidewalk Sign',
    price: 15990,
    costPrice: 6800,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'signage', 'letter-menu-board-displays'],
    rating: 4.9,
    reviewCount: 31,
    tags: ['Changeable Letters', 'Sidewalk Sign', 'Street Sign'],
    description: 'Heavy duty sidewalk sign featuring slotted channels for changeable letter tiles.',
    materials: 'Powder-coated steel A-frame with acrylic letter kit.',
    dimensions: 'Height: 900mm | Width: 600mm',
    variants: [
      { id: 'v-lss-blk', name: 'Black / Full Letter Kit', sku: 'LSS-BLK', price: 15990, costPrice: 6800, stock: 10, attributes: { Color: 'Black' } }
    ]
  },
  {
    id: 'prod-13',
    slug: 'standing-curve-sign',
    name: 'Standing Curve Sign',
    price: 13490,
    costPrice: 5600,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Signage',
    collections: ['all-products', 'signage'],
    rating: 4.9,
    reviewCount: 26,
    tags: ['Curved', 'Standing', 'Sign'],
    description: 'Sculptural curved standing sign featuring an arched silhouette.',
    materials: 'Curved aluminum sheet, weighted steel base.',
    dimensions: 'Height: 1150mm | Width: 400mm',
    variants: [
      { id: 'v-scs-wht', name: 'Off-White Curve', sku: 'SCS-WHT', price: 13490, costPrice: 5600, stock: 12, attributes: { Color: 'Off-White' } }
    ]
  },
  {
    id: 'prod-14',
    slug: 'cafe-menu-board',
    name: 'Cafe Menu Board',
    price: 9990,
    costPrice: 3900,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Menu Displays',
    collections: ['all-products', 'menu-displays', 'restaurant-signage'],
    rating: 4.8,
    reviewCount: 39,
    tags: ['Wall Menu', 'Cafe', 'Wood'],
    description: 'Wall-mounted wooden menu display with brass clips holding printed card stock.',
    materials: 'Solid Ash timber, brushed brass hardware clips.',
    dimensions: 'Height: 750mm | Width: 450mm',
    variants: [
      { id: 'v-cmb-ash', name: 'Natural Ash Wood', sku: 'CMB-ASH', price: 9990, costPrice: 3900, stock: 19, attributes: { Material: 'Ash Wood' } }
    ]
  },
  {
    id: 'prod-15',
    slug: 'curve-tabletop-sign',
    name: 'Curve Tabletop Sign',
    price: 4490,
    costPrice: 1500,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Tabletop Signs',
    collections: ['all-products', 'tabletop-signs', 'restaurant-signage'],
    rating: 5.0,
    reviewCount: 45,
    tags: ['Tabletop', 'Curved', 'Counter'],
    description: 'Compact arched metal tabletop sign for table numbers, QR codes, or counter notices.',
    materials: 'Powder-coated aluminum.',
    dimensions: 'Height: 180mm | Width: 120mm',
    variants: [
      { id: 'v-cts-blk', name: 'Black / Pack of 2', sku: 'CTS-BLK-2P', price: 4490, costPrice: 1500, stock: 35, attributes: { Color: 'Black' } },
      { id: 'v-cts-grn', name: 'Forest Green / Pack of 2', sku: 'CTS-GRN-2P', price: 4490, costPrice: 1500, stock: 20, attributes: { Color: 'Forest Green' } }
    ]
  },
  {
    id: 'prod-16',
    slug: 'circle-menu-display',
    name: 'Circle Menu Display',
    price: 6990,
    costPrice: 2600,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Menu Displays',
    collections: ['all-products', 'menu-displays', 'tabletop-signs'],
    rating: 4.7,
    reviewCount: 18,
    tags: ['Circular', 'Menu', 'Counter'],
    description: 'Rotating circular tabletop menu display.',
    materials: 'Birch plywood disk, solid brass spindle base.',
    dimensions: 'Diameter: 250mm',
    variants: [
      { id: 'v-cmd-brass', name: 'Birch & Brass', sku: 'CMD-BRS', price: 6990, costPrice: 2600, stock: 15, attributes: { Base: 'Brass' } }
    ]
  }
];
