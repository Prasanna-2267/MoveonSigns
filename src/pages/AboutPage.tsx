import React, { useEffect } from 'react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#294A3A]/60">
            OUR STORY &amp; STUDIO
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#294A3A]">
            About Moveon Signs
          </h1>
          <p className="text-sm md:text-base text-[#294A3A]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Crafted for creative commercial spaces across India. We design minimal, timeless signage, menu displays, and architectural hardware for cafes, restaurants, boutiques, and design studios.
          </p>
        </div>

        <div className="aspect-[16/9] bg-[#F8F5EE] border border-[#294A3A]/10 overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1600&q=80"
            alt="Moveon Signs Design Studio & Workshop"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-sm md:text-base text-[#294A3A]/85 leading-relaxed font-sans max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-[#294A3A]">
            Designed for Lifelong Character &amp; Craftsmanship
          </h2>
          <p>
            We believe that hardware and signage shouldn't feel disposable or over-complicated. Whether you’re opening a specialty coffee bar in Mumbai, an art studio in Bengaluru, or a boutique resort in Goa, your physical signage sets the tone for every customer interaction.
          </p>
          <p>
            Every product in our collection is created with clean geometry, premium tactile materials like powder-coated aluminum, solid natural wood, and low-iron low-reflection glass, ensuring effortless functionality day after day.
          </p>
        </div>
      </div>
    </div>
  );
};
