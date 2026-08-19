import React, { useEffect } from 'react';

export const ReturnsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Returns & Warranty | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#294A3A]">Returns &amp; Lifetime Warranty</h1>
        <div className="space-y-4 text-sm text-[#294A3A]/85 leading-relaxed font-sans">
          <p>
            We stand behind every sign, menu board, and table we make. If you are not completely satisfied with your purchase, you may return it within 30 days of delivery.
          </p>
          <h2 className="font-serif text-2xl text-[#294A3A] pt-4">Lifetime Structural Warranty</h2>
          <p>
            All metal hardware, brackets, and structural components come backed by our Moveon Signs lifetime warranty against manufacturing defects.
          </p>
        </div>
      </div>
    </div>
  );
};
