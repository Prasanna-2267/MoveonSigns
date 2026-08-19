export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  date: string;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  fulfillmentStatus: 'Completed' | 'Processing' | 'Shipped' | 'Pending';
  items: { productName: string; variantName?: string; quantity: number; price: number; image: string }[];
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  ordersCount: number;
  totalSpent: number;
  averageOrderValue: number;
  customerType: 'New' | 'Returning' | 'High Value';
  lastOrderDate: string;
}

export interface AdminDiscount {
  id: string;
  code: string;
  title?: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'buy_x_get_y' | 'bulk_tier';
  value: number; // e.g. 10 for 10% or 1500 for ₹1500
  minOrderValue: number;
  usageCount: number;
  usageLimit: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Disabled' | 'Scheduled';
  triggerType?: 'code' | 'automatic';
  appliesTo?: 'all' | 'Signage' | 'Counter Display Cases' | 'Menu Displays' | 'Furniture';
  customerEligibility?: 'all' | 'new_customers' | 'vip_architects';
  revenueGenerated?: number;
}

export interface AdminAbandonedCart {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  cartValue: number;
  itemsCount: number;
  itemsSummary: string;
  lastActivity: string;
  recoveryStatus: 'Not Contacted' | 'Email Sent' | 'Recovered';
}

export interface AdminMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  dimensions: string;
  uploadedDate: string;
  altText: string;
  usedIn: string[];
}

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'MOS-2026-8910',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav@subkocoffee.com',
    customerPhone: '+91 98201 44552',
    customerCity: 'Mumbai',
    date: '2026-08-18',
    total: 34990,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing',
    items: [
      { productName: 'Bakery Display Case Pro', variantName: 'Satin Black / Medium', quantity: 1, price: 34990, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80' }
    ],
    shippingAddress: 'Subko Specialty Coffee, Bandra West, Mumbai, MH 400050',
    trackingNumber: 'BLUEDART-8821940',
    notes: 'Urgent cafe launch on Friday. Bubble wrap reinforced.'
  },
  {
    id: 'ord-102',
    orderNumber: 'MOS-2026-8909',
    customerName: 'Ananya Iyer',
    customerEmail: 'ananya@botanicalbistro.in',
    customerPhone: '+91 98450 78219',
    customerCity: 'Bengaluru',
    date: '2026-08-17',
    total: 28480,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped',
    items: [
      { productName: 'Standing Round Sign', variantName: 'Matte Black', quantity: 1, price: 14990, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' },
      { productName: 'Standing Curve Sign', variantName: 'Off-White', quantity: 1, price: 13490, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' }
    ],
    shippingAddress: '12th Main Road, Indiranagar, Bengaluru, KA 560038',
    trackingNumber: 'DELHIVERY-7739102'
  },
  {
    id: 'ord-103',
    orderNumber: 'MOS-2026-8908',
    customerName: 'Vikram Sengupta',
    customerEmail: 'vikram@artisanbakery.in',
    customerPhone: '+91 98110 32910',
    customerCity: 'Delhi',
    date: '2026-08-16',
    total: 13990,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Completed',
    items: [
      { productName: 'A-Frame Sign', variantName: 'Black Powdercoat', quantity: 1, price: 13990, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80' }
    ],
    shippingAddress: 'Khan Market, New Delhi, DL 110003',
    trackingNumber: 'DTDC-4491028'
  },
  {
    id: 'ord-104',
    orderNumber: 'MOS-2026-8907',
    customerName: 'Pooja Hegde',
    customerEmail: 'pooja.hegde@studioatelier.co',
    customerPhone: '+91 97690 12890',
    customerCity: 'Pune',
    date: '2026-08-15',
    total: 21980,
    paymentStatus: 'Pending',
    fulfillmentStatus: 'Pending',
    items: [
      { productName: 'Peg Letter Board', variantName: 'Natural Birch', quantity: 1, price: 11990, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' },
      { productName: 'Cafe Menu Board', variantName: 'Ash Wood', quantity: 1, price: 9990, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }
    ],
    shippingAddress: 'Koregaon Park, Lane 7, Pune, MH 411001'
  },
  {
    id: 'ord-105',
    orderNumber: 'MOS-2026-8906',
    customerName: 'Kabir Varma',
    customerEmail: 'kabir@coastalroasters.com',
    customerPhone: '+91 99401 55219',
    customerCity: 'Goa',
    date: '2026-08-14',
    total: 10990,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Completed',
    items: [
      { productName: 'Round Sign', variantName: 'Black / 460mm', quantity: 1, price: 10990, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' }
    ],
    shippingAddress: 'Assagao Main Road, North Goa, GA 403507',
    trackingNumber: 'BLUEDART-5510293'
  }
];

export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'cust-1',
    name: 'Aarav Mehta',
    email: 'aarav@subkocoffee.com',
    phone: '+91 98201 44552',
    city: 'Mumbai',
    state: 'Maharashtra',
    ordersCount: 4,
    totalSpent: 112450,
    averageOrderValue: 28112,
    customerType: 'High Value',
    lastOrderDate: '2026-08-18'
  },
  {
    id: 'cust-2',
    name: 'Ananya Iyer',
    email: 'ananya@botanicalbistro.in',
    phone: '+91 98450 78219',
    city: 'Bengaluru',
    state: 'Karnataka',
    ordersCount: 3,
    totalSpent: 64950,
    averageOrderValue: 21650,
    customerType: 'Returning',
    lastOrderDate: '2026-08-17'
  },
  {
    id: 'cust-3',
    name: 'Vikram Sengupta',
    email: 'vikram@artisanbakery.in',
    phone: '+91 98110 32910',
    city: 'Delhi',
    state: 'Delhi',
    ordersCount: 2,
    totalSpent: 38980,
    averageOrderValue: 19490,
    customerType: 'Returning',
    lastOrderDate: '2026-08-16'
  },
  {
    id: 'cust-4',
    name: 'Pooja Hegde',
    email: 'pooja.hegde@studioatelier.co',
    phone: '+91 97690 12890',
    city: 'Pune',
    state: 'Maharashtra',
    ordersCount: 1,
    totalSpent: 21980,
    averageOrderValue: 21980,
    customerType: 'New',
    lastOrderDate: '2026-08-15'
  },
  {
    id: 'cust-5',
    name: 'Kabir Varma',
    email: 'kabir@coastalroasters.com',
    phone: '+91 99401 55219',
    city: 'Goa',
    state: 'Goa',
    ordersCount: 1,
    totalSpent: 10990,
    averageOrderValue: 10990,
    customerType: 'New',
    lastOrderDate: '2026-08-14'
  }
];

export const INITIAL_DISCOUNTS: AdminDiscount[] = [
  {
    id: 'disc-1',
    code: 'FIRSTMOVE10',
    title: 'First-Time Client Welcome Voucher',
    type: 'percentage',
    value: 10,
    minOrderValue: 4999,
    usageCount: 142,
    usageLimit: 500,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'Active',
    triggerType: 'code',
    appliesTo: 'all',
    customerEligibility: 'new_customers',
    revenueGenerated: 468000
  },
  {
    id: 'disc-2',
    code: 'FESTIVE1500',
    title: 'Pan-India Festive Season Flat Discount',
    type: 'fixed',
    value: 1500,
    minOrderValue: 15000,
    usageCount: 88,
    usageLimit: 200,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    status: 'Active',
    triggerType: 'code',
    appliesTo: 'all',
    customerEligibility: 'all',
    revenueGenerated: 312000
  },
  {
    id: 'disc-3',
    code: 'FREESHIP-PANINDIA',
    title: 'Complimentary Express Air Cargo Freight',
    type: 'free_shipping',
    value: 0,
    minOrderValue: 2999,
    usageCount: 215,
    usageLimit: 1000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'Active',
    triggerType: 'code',
    appliesTo: 'all',
    customerEligibility: 'all',
    revenueGenerated: 590000
  },
  {
    id: 'disc-4',
    code: 'ARCHITECT-VIP',
    title: 'Commercial Architects & Interior Fitout Tier',
    type: 'percentage',
    value: 20,
    minOrderValue: 45000,
    usageCount: 34,
    usageLimit: 100,
    startDate: '2026-05-01',
    endDate: '2026-12-31',
    status: 'Active',
    triggerType: 'code',
    appliesTo: 'Signage',
    customerEligibility: 'vip_architects',
    revenueGenerated: 680000
  },
  {
    id: 'disc-5',
    code: 'AUTO-BULK5K',
    title: 'Automatic Volume Tier (₹5,000 Off > ₹50,000)',
    type: 'bulk_tier',
    value: 5000,
    minOrderValue: 50000,
    usageCount: 22,
    usageLimit: 100,
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    status: 'Active',
    triggerType: 'automatic',
    appliesTo: 'all',
    customerEligibility: 'all',
    revenueGenerated: 440000
  },
  {
    id: 'disc-6',
    code: 'SUMMER20',
    title: 'Summer Studio Launch Special',
    type: 'percentage',
    value: 20,
    minOrderValue: 25000,
    usageCount: 50,
    usageLimit: 50,
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    status: 'Expired',
    triggerType: 'code',
    appliesTo: 'all',
    customerEligibility: 'all',
    revenueGenerated: 250000
  }
];

export const INITIAL_ABANDONED_CARTS: AdminAbandonedCart[] = [
  {
    id: 'ac-1',
    customerName: 'Siddharth Rao',
    customerEmail: 'siddharth.rao@cafe9.in',
    customerPhone: '+91 98451 90281',
    cartValue: 34990,
    itemsCount: 1,
    itemsSummary: 'Bakery Display Case Pro (Satin Black)',
    lastActivity: '2 hours ago',
    recoveryStatus: 'Not Contacted'
  },
  {
    id: 'ac-2',
    customerName: 'Meera Nambiar',
    customerEmail: 'meera@roasterycraft.com',
    customerPhone: '+91 97410 88219',
    cartValue: 24980,
    itemsCount: 2,
    itemsSummary: 'Standing Round Sign + A-Frame Sign',
    lastActivity: '5 hours ago',
    recoveryStatus: 'Email Sent'
  },
  {
    id: 'ac-3',
    customerName: 'Arjun Deshmukh',
    customerEmail: 'arjun@deshmukhstudios.com',
    customerPhone: '+91 98230 44910',
    cartValue: 11990,
    itemsCount: 1,
    itemsSummary: 'Peg Letter Board (Natural Birch)',
    lastActivity: '1 day ago',
    recoveryStatus: 'Recovered'
  }
];

export const INITIAL_MEDIA: AdminMediaItem[] = [
  {
    id: 'med-1',
    name: 'bakery-display-case-pro-main.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    size: '1.4 MB',
    dimensions: '1920 x 1280',
    uploadedDate: '2026-08-10',
    altText: 'The Bakery Display Case Pro on Countertop',
    usedIn: ['Hero Section', 'Product Page']
  },
  {
    id: 'med-2',
    name: 'standing-round-sign-street.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    size: '2.1 MB',
    dimensions: '2000 x 1333',
    uploadedDate: '2026-08-08',
    altText: 'Moveon Signs Standing Round Sign in Cafe Entrance',
    usedIn: ['Signage Collection', 'Warmer Welcome Section']
  },
  {
    id: 'med-3',
    name: 'peg-letter-board-cafe.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    size: '1.8 MB',
    dimensions: '1920 x 1080',
    uploadedDate: '2026-08-05',
    altText: 'Wooden Peg Letter Menu Board on White Tile Wall',
    usedIn: ['Menu Displays', 'Editorial Section']
  },
  {
    id: 'med-4',
    name: 'a-frame-sidewalk-sign.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    size: '2.3 MB',
    dimensions: '2400 x 1600',
    uploadedDate: '2026-08-01',
    altText: 'Black Aluminum A-Frame Sidewalk Sign on Concrete',
    usedIn: ['Brand Quote Section', 'Sidewalk Signs Collection']
  }
];

export const INITIAL_SEARCH_QUERIES = [
  { query: 'Bakery display case', searches: 1420, clicks: 890, orders: 48, conversionRate: '5.4%' },
  { query: 'Round sign', searches: 1180, clicks: 760, orders: 42, conversionRate: '5.5%' },
  { query: 'A frame sign', searches: 940, clicks: 620, orders: 36, conversionRate: '5.8%' },
  { query: 'Peg letter board', searches: 810, clicks: 540, orders: 29, conversionRate: '5.3%' },
  { query: 'Table numbers', searches: 430, clicks: 210, orders: 12, conversionRate: '5.7%' },
  { query: 'Neon sign (no results)', searches: 290, clicks: 0, orders: 0, conversionRate: '0.0%' }
];
