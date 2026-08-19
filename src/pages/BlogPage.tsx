import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: 'Designing a Warmer Welcome for Your Coffee Shop',
    date: 'AUGUST 14, 2026',
    category: 'INTERIOR DESIGN',
    excerpt: 'How spatial hierarchy, warm lighting, and minimal signage set the tone for unforgettable guest experiences.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Why Menu Board Typography Matters More Than You Think',
    date: 'JULY 28, 2026',
    category: 'BRANDING',
    excerpt: 'Explore how legible fonts, clean spacing, and wooden peg systems reduce ordering friction in busy cafes.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
  }
];

export const BlogPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Journal & Studio Blog | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#294A3A]/60">
            STUDIO JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#294A3A]">
            Stories &amp; Inspiration
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {ARTICLES.map((article) => (
            <div key={article.id} className="group space-y-4 cursor-pointer">
              <div className="aspect-[16/10] bg-[#F8F5EE] border border-[#294A3A]/10 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-[11px] font-mono text-[#294A3A]/60">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <h2 className="font-serif text-2xl text-[#294A3A] group-hover:underline">
                  {article.title}
                </h2>
                <p className="text-xs text-[#294A3A]/80 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-[#294A3A] uppercase tracking-wider">
                  <span>READ STORY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
