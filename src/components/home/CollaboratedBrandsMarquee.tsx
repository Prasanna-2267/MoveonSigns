import React from 'react';

interface Brand {
  name: string;
  tagline?: string;
}

const COLLABORATED_BRANDS: Brand[] = [
  { name: 'Third Wave Coffee' },
  { name: 'Blue Tokai Coffee Roasters' },
  { name: 'Subko Specialty Coffee' },
  { name: 'Araku Coffee' },
  { name: 'Paul Bakery India' },
  { name: 'Soho House Mumbai' },
  { name: 'Taj Hotels & Palaces' },
  { name: 'Studio Lotus Architects' },
  { name: 'Morphogenesis Design' },
  { name: 'Blue Bottle Coffee' },
  { name: 'Nicobar Design Studio' },
  { name: 'Le Pain Quotidien' },
  { name: 'Oberoi Hotels & Resorts' },
  { name: 'Starbucks Reserve' },
  { name: 'The Bombay Canteen' }
];

export const CollaboratedBrandsMarquee: React.FC = () => {
  // Duplicate list to achieve seamless infinite looping
  const marqueeItems = [...COLLABORATED_BRANDS, ...COLLABORATED_BRANDS];

  return (
    <section className="bg-[#FEFBF4] py-8 md:py-10 border-y border-[#294A3A]/10 overflow-hidden relative select-none">
      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-[#FEFBF4] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-[#FEFBF4] to-transparent z-10" />

      <div className="space-y-4">
        {/* Overline Heading */}
        <p className="text-center font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-[#294A3A]/60 px-4">
          COLLABORATED WITH RENOWNED ARCHITECTURAL SPACES &amp; BOUTIQUES
        </p>

        {/* Continuous Horizontal Rolling Ticker */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center space-x-8 md:space-x-12 py-1">
            {marqueeItems.map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-8 md:space-x-12 flex-shrink-0"
              >
                <span className="font-serif text-lg md:text-2xl text-[#294A3A]/80 hover:text-[#294A3A] transition-colors whitespace-nowrap tracking-wide font-normal">
                  {brand.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#294A3A]/30 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
