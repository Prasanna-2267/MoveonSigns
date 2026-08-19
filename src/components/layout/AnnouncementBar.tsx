import React from 'react';
import { CurrencySelector } from '../ecommerce/CurrencySelector';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#294A3A] text-[#FEFBF4] text-xs font-sans py-3.5 px-4 md:px-12 flex items-center justify-between min-h-[50px] relative z-40">
      {/* Spacer for desktop symmetry */}
      <div className="hidden md:block w-48" />

      {/* Main Promo Text */}
      <div className="flex-1 text-center font-medium tracking-wide">
        <span>Free shipping across India on all orders over ₹4,999. </span>
        <Link
          to="/collections/all-products"
          className="underline font-bold hover:opacity-90 transition-opacity whitespace-nowrap ml-1"
        >
          Shop Now!
        </Link>
      </div>

      {/* Currency Selector */}
      <div className="flex justify-end md:w-48">
        <CurrencySelector />
      </div>
    </div>
  );
};
