import React from 'react';

export const FullBleedImageSection: React.FC = () => {
  return (
    <section className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden bg-[#FEFBF4]">
      <img
        src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=2200&q=85"
        alt="Immersive Studio Interior Photography"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
};
