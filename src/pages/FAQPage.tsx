import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    question: 'How do I customize my Moveon Signs sign or menu board?',
    answer: 'Most of our products are designed with vinyl decal surfaces, Changeable Letter Kits, or magnetic tiles. You can either apply your own custom vinyl decals locally or use our modular letter sets.'
  },
  {
    question: 'Where do Moveon Signs products deliver in India?',
    answer: 'We provide express pan-India freight delivery to all pin codes across major metro cities and regional hubs (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Goa, and more).'
  },
  {
    question: 'Are your sidewalk signs weather and monsoon resistant?',
    answer: 'Yes! Our A-frame and blade signs are manufactured using heavy-duty powder-coated aluminum and weighted steel baseplates designed specifically for outdoor weather resilience.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day trial return policy. If a product does not fit your space, simply contact our support team for a return authorization.'
  }
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Frequently Asked Questions | Moveon Signs";
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#294A3A]/60">
            HELP &amp; SUPPORT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#294A3A]">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="border-t border-[#294A3A]/15 divide-y divide-[#294A3A]/10">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left text-sm md:text-base font-serif font-bold text-[#294A3A]"
              >
                <span>{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                )}
              </button>
              {openIndex === idx && (
                <p className="mt-3 text-xs md:text-sm text-[#294A3A]/80 leading-relaxed font-sans animate-fade-in">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
