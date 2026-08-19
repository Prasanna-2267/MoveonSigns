import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden bg-[#FEFBF4]">
      {/* Background Photography */}
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85"
        alt="The Bakery Display Case Pro"
        className="w-full h-full object-cover object-center"
      />

      {/* Subtle overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Promotional Red Oval Badges */}
      <div className="max-w-[1650px] mx-auto relative h-full pointer-events-none">
        {/* Left Badge: ONLINE NOW */}
        <div className="absolute top-12 left-6 md:left-16 pointer-events-auto transform -rotate-6 transition-transform hover:rotate-0">
          <span className="inline-block border-2 border-[#C71910] text-[#C71910] bg-[#FEFBF4]/90 px-4 py-1.5 rounded-[50%] font-sans text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm">
            ONLINE NOW
          </span>
        </div>

        {/* Right Badge: NEW */}
        <div className="absolute top-12 right-6 md:right-16 pointer-events-auto transform rotate-6 transition-transform hover:rotate-0">
          <span className="inline-block border-2 border-[#C71910] text-[#C71910] bg-[#FEFBF4]/90 px-5 py-1.5 rounded-[50%] font-sans text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm">
            NEW
          </span>
        </div>

        {/* Hero Title & CTA (Lower Central Area) */}
        <div className="absolute bottom-10 left-0 right-0 px-6 text-center space-y-3 pointer-events-auto">
          <Link to="/products/bakery-display-case-pro" className="inline-block group">
            <h1 className="text-[#C71910] font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none group-hover:scale-[1.01] transition-transform drop-shadow-sm">
              THE BAKERY DISPLAY CASE PRO
            </h1>
          </Link>
          <div className="pt-1">
            <Link
              to="/products/bakery-display-case-pro"
              className="inline-block text-[#FEFBF4] bg-[#294A3A] hover:bg-[#213B2E] px-6 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-widest transition-colors rounded-sm shadow-md"
            >
              AVAILABLE FOR PREORDER
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
