import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const WarmerWelcomeSection: React.FC = () => {
  return (
    <section className="bg-[#FEFBF4] py-20 md:py-32 border-b border-[#294A3A]/10">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-12 md:space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#294A3A]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#294A3A]/70 font-mono">
              CURATED ARCHITECTURAL COLLECTIONS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#294A3A] font-normal leading-tight">
            Crafted for a Warmer Welcome
          </h2>
          <p className="text-xs md:text-sm text-[#294A3A]/75 font-sans leading-relaxed pt-1">
            Thoughtful signage, counter cases, and letter displays engineered to elevate the first impression of hospitality spaces, boutique cafes, and creative studios.
          </p>
        </div>

        {/* 50 / 50 Editorial Split Grid with Compact, Elegant Landscape Proportions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Signage Collection Card */}
          <div className="group relative overflow-hidden bg-[#F8F5EE] aspect-[16/11] sm:aspect-[16/10] max-h-[420px] rounded-sm border border-[#294A3A]/10 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Shop Architectural Signage"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-[#FEFBF4]">
              {/* Top Tag */}
              <div className="flex justify-between items-start">
                <span className="bg-[#FEFBF4]/90 backdrop-blur-xs text-[#294A3A] text-[10px] font-bold font-mono tracking-widest uppercase px-3 py-1 rounded-xs shadow-2xs">
                  01 / SIGNAGE
                </span>
              </div>

              {/* Bottom Details & Button */}
              <div className="space-y-3 sm:space-y-4 text-left">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white leading-tight">
                    Exterior &amp; Interior Signage
                  </h3>
                  <p className="text-xs text-white/85 font-sans mt-1">
                    A-Frames, round standing posts &amp; hanging blade signs
                  </p>
                </div>

                <div>
                  <Link
                    to="/collections/signage"
                    className="inline-flex items-center justify-center space-x-2 bg-[#FEFBF4] text-[#294A3A] hover:bg-[#294A3A] hover:text-[#FEFBF4] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition-all shadow-md group/btn"
                  >
                    <span>SHOP SIGNAGE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Menu Displays Card */}
          <div className="group relative overflow-hidden bg-[#F8F5EE] aspect-[16/11] sm:aspect-[16/10] max-h-[420px] rounded-sm border border-[#294A3A]/10 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
              alt="Shop Menu Displays & Letter Boards"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-[#FEFBF4]">
              {/* Top Tag */}
              <div className="flex justify-between items-start">
                <span className="bg-[#FEFBF4]/90 backdrop-blur-xs text-[#294A3A] text-[10px] font-bold font-mono tracking-widest uppercase px-3 py-1 rounded-xs shadow-2xs">
                  02 / MENU DISPLAYS
                </span>
              </div>

              {/* Bottom Details & Button */}
              <div className="space-y-3 sm:space-y-4 text-left">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white leading-tight">
                    Letter Boards &amp; Cafe Displays
                  </h3>
                  <p className="text-xs text-white/85 font-sans mt-1">
                    Peg letter rails, timber baker menus &amp; counter cases
                  </p>
                </div>

                <div>
                  <Link
                    to="/collections/menu-displays"
                    className="inline-flex items-center justify-center space-x-2 bg-[#FEFBF4] text-[#294A3A] hover:bg-[#294A3A] hover:text-[#FEFBF4] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition-all shadow-md group/btn"
                  >
                    <span>SHOP MENU DISPLAYS</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
