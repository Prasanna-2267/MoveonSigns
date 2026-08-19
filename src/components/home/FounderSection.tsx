import React from 'react';

export const FounderSection: React.FC = () => {
  return (
    <section className="bg-[#F8F5EE] py-14 md:py-20 border-b border-[#294A3A]/10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          {/* Left: Founder Illustration / Workshop Photo (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="aspect-[4/3] sm:aspect-[1/1] w-full max-w-sm max-h-[320px] bg-[#FEFBF4] border border-[#294A3A]/15 p-3 sm:p-4 shadow-sm rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Moveon Signs Workshop & Design Studio"
                className="w-full h-full object-cover filter contrast-[1.03]"
              />
            </div>
          </div>

          {/* Right: Note & Signature (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#294A3A]/60 font-bold block">
              OUR STORY
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#294A3A]">
              A Note From Moveon Signs
            </h2>

            <div className="space-y-4 text-sm md:text-base text-[#294A3A]/85 leading-relaxed font-sans max-w-xl">
              <p>
                We started Moveon Signs to craft simple, architectural display products for creative spaces across India. Today we are still doing just that and helping people like you, all over India and worldwide, make their space inspiring.
              </p>
              <p>
                Thanks for visiting us and please let us know if you have any questions or custom inquiries.
              </p>
            </div>

            {/* Handwritten Signature */}
            <div className="pt-4 space-y-1">
              <span className="font-serif text-3xl md:text-4xl text-[#294A3A] italic font-bold tracking-wide">
                Moveon Signs
              </span>
              <p className="text-[11px] uppercase tracking-widest text-[#294A3A]/60 font-bold">
                FOUNDERS &amp; CRAFTSMEN, MOVEON SIGNS STUDIO
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
