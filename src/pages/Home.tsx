import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { CollaboratedBrandsMarquee } from '../components/home/CollaboratedBrandsMarquee';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { WarmerWelcomeSection } from '../components/home/WarmerWelcomeSection';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { BrandQuoteSection } from '../components/home/BrandQuoteSection';
import { FullBleedImageSection } from '../components/home/FullBleedImageSection';
import { PressSection } from '../components/home/PressSection';
import { FounderSection } from '../components/home/FounderSection';
import { BrandDescriptionSection } from '../components/home/BrandDescriptionSection';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shop Signage, Menu Displays & Furniture | Moveon Signs';
  }, []);

  return (
    <div className="animate-fade-in">
      <Hero />
      <CollaboratedBrandsMarquee />
      <BestSellersSection />
      <WarmerWelcomeSection />
      <TestimonialSection />
      <BrandQuoteSection />
      <FullBleedImageSection />
      <PressSection />
      <FounderSection />
      <BrandDescriptionSection />
    </div>
  );
};
