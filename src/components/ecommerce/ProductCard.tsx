import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const price = product.price;
  const compareAtPrice = product.compareAtPrice;
  const isOnSale = compareAtPrice && compareAtPrice > price;

  return (
    <div
      className="group block text-[#294A3A] space-y-3 cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link
        to={`/products/${product.slug}`}
        className="block overflow-hidden relative bg-[#F8F5EE] aspect-[4/5] rounded-xs border border-[#294A3A]/5 shadow-2xs"
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images.length > 1
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image (on Hover) */}
        {product.images.length > 1 && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#294A3A] text-[#FEFBF4] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-xs font-mono">
              BEST SELLER
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="bg-[#294A3A] text-[#FEFBF4] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-xs font-mono">
              NEW
            </span>
          )}
          {isOnSale && (
            <span className="bg-[#C71910] text-[#FEFBF4] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-xs font-mono">
              SALE
            </span>
          )}
        </div>

        {/* Quick Variant Color Dots */}
        {product.variants && product.variants.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 opacity-100 transition-opacity duration-200">
            {product.variants.slice(0, 3).map((variant, idx) => (
              <span
                key={variant.id || idx}
                title={variant.name}
                className="w-2.5 h-2.5 rounded-full border border-[#FEFBF4] bg-[#294A3A]/80 shadow-xs"
              />
            ))}
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="space-y-1.5 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category Tag */}
          {product.category && (
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#294A3A]/60 font-mono">
              {product.category}
            </p>
          )}

          {/* Title */}
          <Link to={`/products/${product.slug}`} className="block group-hover:underline">
            <h3 className="font-sans text-sm md:text-[15px] font-medium text-[#294A3A] leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-1.5 text-xs text-[#294A3A]/80">
            <span className="text-amber-500 text-xs tracking-tighter">★★★★★</span>
            <span className="font-mono text-[11px] font-bold text-[#294A3A]">
              {product.rating || 4.9}
            </span>
            <span className="text-[#294A3A]/50 text-[10px]">
              ({product.reviewCount || 28})
            </span>
          </div>

          {/* Price & Small Add to Cart Icon Widget */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline space-x-2 text-sm font-sans">
              {isOnSale ? (
                <>
                  <span className="text-[#C71910] font-bold">{formatPrice(price)}</span>
                  <span className="text-[#294A3A]/40 line-through text-xs">
                    {formatPrice(compareAtPrice)}
                  </span>
                </>
              ) : (
                <span className="text-[#294A3A] font-bold">{formatPrice(price)}</span>
              )}
            </div>

            {/* Small Icon Widget Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, product.variants[0], 1);
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 1500);
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90 ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#294A3A] hover:bg-[#1E3A2B] text-[#FEFBF4] hover:scale-105'
              }`}
              title="Add to cart"
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdded ? (
                <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
