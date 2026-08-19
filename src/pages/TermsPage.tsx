import React, { useEffect } from 'react';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-6 text-sm text-[#294A3A]/85 font-sans leading-relaxed">
        <h1 className="font-serif text-4xl text-[#294A3A] mb-6">Terms of Service</h1>
        <p>
          Welcome to Moveon Signs. By accessing or using our website, products, and commercial services, you agree to be bound by these terms.
        </p>
        <h2 className="font-serif text-xl text-[#294A3A] pt-2">1. Commercial Use &amp; Intellectual Property</h2>
        <p>
          All designs, trademarks, registered hardware specifications, product imagery, and copy published on this website remain the sole intellectual property of Moveon Signs Studio Pvt Ltd.
        </p>
      </div>
    </div>
  );
};
