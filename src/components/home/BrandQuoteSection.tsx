import React from 'react';

export const BrandQuoteSection: React.FC = () => {
  return (
    <section className="bg-[#FEFBF4] py-14 md:py-20 border-b border-[#294A3A]/10">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Left: Product Photograph */}
          <div className="order-2 md:order-1 aspect-[16/11] sm:aspect-[4/3] max-h-[340px] bg-[#F8F5EE] overflow-hidden border border-[#294A3A]/10 rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
              alt="Functional Minimal Signage"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Centered Editorial Magazine Spread Quote */}
          <div className="order-1 md:order-2 text-center md:px-8 space-y-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#294A3A]/60 font-bold block">
              THE MOVEON SIGNS PHILOSOPHY
            </span>
            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#294A3A] leading-tight italic">
              "Functional, minimal &amp; playful signage products"
            </blockquote>
            <div className="w-12 h-[1px] bg-[#294A3A]/30 mx-auto" />
            <p className="text-xs uppercase tracking-widest text-[#294A3A] font-semibold">
              MOVEON SIGNS STUDIO — INDIA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
