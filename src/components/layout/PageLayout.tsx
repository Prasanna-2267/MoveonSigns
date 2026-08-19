import React from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../ecommerce/CartDrawer';
import { SearchOverlay } from '../ecommerce/SearchOverlay';
import { AccountModal } from '../ecommerce/AccountModal';
import { FloatingChatButton } from './FloatingChatButton';

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FEFBF4] text-[#294A3A]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <AccountModal />
      <FloatingChatButton />
    </div>
  );
};
