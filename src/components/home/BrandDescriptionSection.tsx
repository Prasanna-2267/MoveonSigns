import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BrandDescriptionSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-[#FEFBF4] py-14 md:py-20 border-b border-[#294A3A]/10">
      <div className="max-w-[1000px] mx-auto px-6 text-center space-y-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#294A3A]">
          Signage, Menu Displays &amp; Furniture
        </h2>

        <p className="text-sm md:text-base text-[#294A3A]/85 leading-relaxed font-sans max-w-2xl mx-auto">
          At Moveon Signs, we believe signage is more than a marker – it’s the first impression your space makes. From a café on the corner to a boutique studio or bustling restaurant, our products are designed to elevate everyday interactions. Clean, functional, and beautifully minimal, every piece blends seamlessly into its surroundings while helping your brand stand out.
        </p>

        {/* Expandable Paragraphs */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-sm text-[#294A3A]/80 leading-relaxed max-w-2xl mx-auto pt-2 overflow-hidden text-left sm:text-center"
            >
              <p>
                Whether you’re crafting an inviting entrance with an outdoor A-frame sidewalk sign, organizing daily food specials with a wooden peg letter menu board, or showcasing artisan pastries in a glass display case, our collections are built to endure daily commercial use with zero compromise on aesthetics.
              </p>
              <p>
                Designed and manufactured with premium sustainable materials like powder-coated aluminum, solid timber, and ultra-clear toughened glass. Discover hardware solutions engineered to make setting up and running your space simpler across India.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="gw-button-secondary py-3 px-8 text-xs"
          >
            {isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
          </button>
        </div>
      </div>
    </section>
  );
};
