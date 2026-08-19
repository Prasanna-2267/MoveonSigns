import React, { useEffect } from 'react';

export const ShippingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shipping Information | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#294A3A]">Shipping Information</h1>
        <div className="space-y-4 text-sm text-[#294A3A]/85 leading-relaxed font-sans">
          <p className="font-bold text-[#C71910] uppercase tracking-wider text-xs">
            Free Express Freight Shipping across India on all orders over ₹4,999 INR.
          </p>
          <p>
            We ship our entire range of architectural signage, display cases, and furniture nationwide with tracked express couriers (Bluedart, Delhivery, Express Cargo).
          </p>
          <h2 className="font-serif text-2xl text-[#294A3A] pt-4">Estimated Delivery Times</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Metro Cities (Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad):</strong> 2–3 business days</li>
            <li><strong>Tier 2 &amp; Tier 3 Cities:</strong> 3–5 business days</li>
            <li><strong>Remote / Northeast regions:</strong> 5–7 business days</li>
            <li><strong>International Orders:</strong> 5–9 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
