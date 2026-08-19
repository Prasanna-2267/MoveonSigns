import React, { useEffect } from 'react';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-6 text-sm text-[#294A3A]/85 font-sans leading-relaxed">
        <h1 className="font-serif text-4xl text-[#294A3A] mb-6">Privacy Policy</h1>
        <p>
          At Moveon Signs, we are committed to respecting and protecting your privacy. This policy outlines how we collect, process, and safeguard your personal information when visiting our website or purchasing products.
        </p>
        <h2 className="font-serif text-xl text-[#294A3A] pt-2">Data Protection</h2>
        <p>
          We never sell, rent, or trade your personal data to third parties. Information collected during checkout is strictly used to fulfill shipping, process payments, and provide customer support across India.
        </p>
      </div>
    </div>
  );
};
