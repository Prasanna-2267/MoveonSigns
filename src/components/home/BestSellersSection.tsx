import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../ecommerce/ProductCard';
import { PRODUCTS } from '../../data/products';

export const BestSellersSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Best seller products from catalog
  const bestSellers = PRODUCTS.filter(
    (p) => p.isBestseller || p.collections?.includes('best-sellers') || (p.rating && p.rating >= 4.8)
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = 360;
      if (direction === 'left') {
        if (scrollLeft <= 15) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -cardWidth * 1.5, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft >= scrollWidth - clientWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth * 1.5, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="bg-[#FEFBF4] py-14 md:py-20 border-b border-[#294A3A]/10">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#294A3A]/10 pb-5 gap-4">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#294A3A]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#294A3A]/70 font-mono">
                FLAGSHIP COLLECTION
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#294A3A] font-normal leading-tight">
              Best Sellers
            </h2>
            <div>
              <Link
                to="/collections/all-products"
                className="text-xs uppercase tracking-widest text-[#294A3A] font-bold link-underline inline-block pt-1"
              >
                VIEW ALL BEST SELLERS ({bestSellers.length}) →
              </Link>
            </div>
          </div>

          {/* Header Indicator Badge */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#294A3A]/70 bg-[#F8F5EE] border border-[#294A3A]/10 px-3 py-1.5 rounded-full">
            <span>Scroll or use arrows to explore</span>
          </div>
        </div>

        {/* Product Carousel Track with High-Contrast Floating End Arrows */}
        <div className="relative group/bestsellers">
          {/* Left End Floating Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 sm:left-3 top-[35%] -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all bg-[#294A3A] hover:bg-[#1E3A2B] text-[#FEFBF4] shadow-xl border-2 border-[#FEFBF4] cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous best seller products"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Right End Floating Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 sm:right-3 top-[35%] -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all bg-[#294A3A] hover:bg-[#1E3A2B] text-[#FEFBF4] shadow-xl border-2 border-[#FEFBF4] cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next best seller products"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Product Carousel Track */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 snap-x snap-mandatory pt-2"
          >
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] flex-shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
