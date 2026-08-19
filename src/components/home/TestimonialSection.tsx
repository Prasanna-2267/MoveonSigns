import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const goToTestimonial = (idx: number) => {
    setDirection(idx >= currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="bg-[#F8F5EE] py-12 md:py-20 border-b border-[#294A3A]/10 relative overflow-hidden">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-8 md:space-y-10">
        {/* Section Header & Rating Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#294A3A]/10 pb-5 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#294A3A]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#294A3A]/70 font-mono">
                CLIENT EXPERIENCES &amp; ARCHITECTURAL STORIES
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#294A3A] font-normal leading-tight">
              Loved by India's Finest Spaces
            </h2>
          </div>

          {/* Social Proof Aggregate Rating Badge */}
          <div className="flex items-center space-x-3 bg-[#FEFBF4] px-4 py-2 rounded-full border border-[#294A3A]/10 shadow-2xs self-start md:self-auto">
            <div className="flex text-amber-500 text-xs tracking-tighter">
              {'★'.repeat(5)}
            </div>
            <span className="text-xs font-bold text-[#294A3A] font-sans">
              4.98 / 5.0 Rating
            </span>
            <span className="text-[10px] text-[#294A3A]/60 font-mono">
              (450+ Installations)
            </span>
          </div>
        </div>

        {/* Spotlight Review Feature Card with Smooth Fluid Slide Animation */}
        <div className="bg-[#FEFBF4] border border-[#294A3A]/10 rounded-lg p-6 sm:p-8 md:p-10 shadow-xs min-h-[360px] flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 35, filter: 'blur(3px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: direction * -35, filter: 'blur(3px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              {/* Left: Quote & Attribution (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Star Rating & Verified Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                    ))}
                  </div>

                  <div className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>VERIFIED COMMERCIAL CLIENT</span>
                  </div>
                </div>

                {/* Expressive Serif Quote */}
                <div>
                  <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-[#294A3A] leading-relaxed italic font-normal">
                    “{current.quote}”
                  </blockquote>
                </div>

                {/* Author & Cafe Project Info */}
                <div className="border-t border-[#294A3A]/10 pt-4 space-y-1">
                  <p className="font-sans font-bold text-sm sm:text-base text-[#294A3A]">
                    {current.author}
                  </p>
                  <p className="text-xs text-[#294A3A]/70 font-sans">
                    {current.roleCompany}
                  </p>
                  {current.productName && (
                    <div className="pt-1">
                      <span className="inline-block bg-[#F8F5EE] border border-[#294A3A]/10 text-[#294A3A] text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded">
                        Featured in project: {current.productName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Carousel Next/Prev Controls */}
                <div className="flex items-center space-x-3 pt-1">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className="w-9 h-9 border border-[#294A3A]/20 hover:border-[#294A3A] rounded-full flex items-center justify-center text-[#294A3A] hover:bg-[#294A3A] hover:text-[#FEFBF4] transition-all cursor-pointer shadow-2xs"
                    aria-label="Previous customer review"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[1.75]" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className="w-9 h-9 border border-[#294A3A]/20 hover:border-[#294A3A] rounded-full flex items-center justify-center text-[#294A3A] hover:bg-[#294A3A] hover:text-[#FEFBF4] transition-all cursor-pointer shadow-2xs"
                    aria-label="Next customer review"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[1.75]" />
                  </motion.button>

                  {/* Dot Switchers */}
                  <div className="flex space-x-1.5 pl-2">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToTestimonial(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx
                            ? 'w-6 bg-[#294A3A]'
                            : 'w-1.5 bg-[#294A3A]/20 hover:bg-[#294A3A]/50'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Architectural Lookbook Photo (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full max-w-[320px] max-h-[260px] bg-[#F8F5EE] border border-[#294A3A]/10 overflow-hidden rounded-md shadow-xs group">
                  <img
                    src={current.image}
                    alt={current.author}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <p className="font-mono text-[9px] uppercase font-bold tracking-widest text-white/80">
                      SPACE SPOTLIGHT
                    </p>
                    <p className="font-serif text-xs font-medium mt-0.5 truncate">
                      {current.roleCompany}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Horizontally Moving Customer Reviews Marquee (Perfect Uniform Geometry & Clean Margins) */}
        <div className="relative pt-3 overflow-hidden rounded-xl">
          {/* Symmetrical Left & Right Edge Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#F8F5EE] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#F8F5EE] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-slow flex items-stretch space-x-4 py-2 px-4">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => {
              const originalIndex = idx % TESTIMONIALS.length;
              const isSelected = currentIndex === originalIndex;
              return (
                <div
                  key={`${t.id}-${idx}`}
                  onClick={() => goToTestimonial(originalIndex)}
                  className={`w-[270px] sm:w-[300px] h-[160px] flex-shrink-0 p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between select-none bg-[#FEFBF4] ${
                    isSelected
                      ? 'border-2 border-[#294A3A] shadow-sm'
                      : 'border border-[#294A3A]/15 hover:border-[#294A3A]/40'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex text-amber-500 text-xs tracking-tight">
                      {'★'.repeat(t.rating)}
                    </div>
                    <p className="text-xs text-[#294A3A] font-serif italic line-clamp-3 leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#294A3A]/10">
                    <p className="text-xs font-bold text-[#294A3A] font-sans truncate">
                      {t.author}
                    </p>
                    <p className="text-[10px] text-[#294A3A]/60 truncate font-sans">
                      {t.roleCompany.split(',')[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
