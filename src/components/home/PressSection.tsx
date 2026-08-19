import React from 'react';
import { PRESS_ITEMS } from '../../data/press';

export const PressSection: React.FC = () => {
  return (
    <section className="bg-[#FEFBF4] py-14 md:py-20 border-b border-[#294A3A]/10">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-12">
        <div className="text-center space-y-2">
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#294A3A]/60 font-bold">
            AS FEATURED IN
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {PRESS_ITEMS.map((press) => (
            <div
              key={press.id}
              className="text-center space-y-4 p-6 border border-[#294A3A]/10 bg-[#F8F5EE]/50 hover:border-[#294A3A]/30 transition-colors"
            >
              <h3 className="font-serif text-2xl font-bold text-[#294A3A] tracking-wider uppercase">
                {press.publication}
              </h3>
              <p className="font-sans text-xs text-[#294A3A]/80 leading-relaxed italic">
                {press.quote}
              </p>
              {press.issueDate && (
                <span className="inline-block text-[10px] uppercase tracking-widest text-[#294A3A]/50 font-mono">
                  {press.issueDate}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
