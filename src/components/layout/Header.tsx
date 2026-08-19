import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { openSearch, openAccount } = useSearch();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#FEFBF4] border-b border-[#294A3A]/10 sticky top-0 z-30 transition-shadow">
        <div className="max-w-[1650px] mx-auto px-6 md:px-12 h-[65px] flex items-center justify-between">
          {/* Left: Mobile Menu Trigger + Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1 text-[#294A3A]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>

            <Link
              to="/"
              className="font-jost text-xl md:text-2xl font-bold tracking-[0.12em] text-[#294A3A] hover:opacity-90 transition-opacity uppercase"
            >
              MOVE ON SIGNS ®
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {MAIN_NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative py-5"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className="font-serif text-[17px] text-[#294A3A] font-medium link-underline tracking-wide hover:text-[#294A3A]"
                >
                  {item.label}
                </Link>

                {/* Dropdown / Mega Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#FEFBF4] border border-[#294A3A]/15 shadow-xl p-4 space-y-3 z-50 rounded-sm">
                    {item.dropdown.map((group, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#294A3A]/50 font-bold border-b border-[#294A3A]/10 pb-1">
                          {group.title}
                        </h4>
                        <div className="space-y-1.5 pt-1">
                          {group.items.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              className="flex items-center justify-between text-xs text-[#294A3A] hover:font-semibold transition-all py-1"
                            >
                              <span>{sub.label}</span>
                              {sub.tag && (
                                <span className="text-[9px] bg-[#C71910] text-[#FEFBF4] px-1.5 py-0.5 uppercase tracking-wider font-bold">
                                  {sub.tag}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Utility Icons (Account, Search, Cart) */}
          <div className="flex items-center space-x-5 text-[#294A3A]">
            <button
              onClick={openAccount}
              className="p-1 hover:opacity-75 transition-opacity"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={openSearch}
              className="p-1 hover:opacity-75 transition-opacity"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={openCart}
              className="p-1 hover:opacity-75 transition-opacity relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#C71910] text-[#FEFBF4] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
