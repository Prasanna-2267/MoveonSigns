export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  costPrice?: number; // Internal Making Cost / COGS (Admin only)
  compareAtPrice?: number;
  image?: string;
  stock: number;
  attributes: Record<string, string>; // e.g. { Color: 'Black', Size: 'Large' }
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  costPrice?: number; // Internal Making Cost / COGS (Admin only)
  compareAtPrice?: number;
  currency: string;
  images: string[];
  category: string;
  collections: string[];
  variants: ProductVariant[];
  defaultVariantId?: string;
  description: string;
  specifications?: ProductSpecification[];
  materials?: string;
  dimensions?: string;
  shippingInfo?: string;
  returnInfo?: string;
  customSections?: { id: string; heading: string; content: string }[];
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  heroImage?: string;
  featuredProducts?: string[];
}

export interface CartItem {
  id: string; // unique key combining productId and variantId
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag?: string;
  exchangeRate: number; // relative to USD
}

export interface Testimonial {
  id: string;
  author: string;
  roleCompany: string;
  quote: string;
  image: string;
  rating: number;
  productName?: string;
}

export interface PressItem {
  id: string;
  publication: string;
  quote: string;
  issueDate?: string;
}

export interface NavItem {
  label: string;
  path: string;
  featured?: boolean;
  dropdown?: {
    title: string;
    items: { label: string; path: string; tag?: string }[];
  }[];
}
