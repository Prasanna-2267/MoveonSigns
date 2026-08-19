import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, User, ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { totalItems, openCart } = useCart();
  const { openSearch, openAccount } = useSearch();

  const handleAction = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#171716] z-50 cursor-pointer"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#FEFBF4] text-[#294A3A] z-50 flex flex-col justify-between p-6 border-r border-[#294A3A]/10 shadow-2xl"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center pb-6 border-b border-[#294A3A]/10">
                <Link
                  to="/"
                  onClick={onClose}
                  className="font-jost text-xl tracking-wider font-semibold text-[#294A3A]"
                >
                  MOVE ON SIGNS ®
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#294A3A]/5 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-[#294A3A]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-4">
                {MAIN_NAV_ITEMS.map((item) => (
                  <div key={item.label} className="border-b border-[#294A3A]/5 pb-3">
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="font-serif text-2xl text-[#294A3A] hover:opacity-75 flex justify-between items-center"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-5 h-5 opacity-40" />
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.dropdown[0].items.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={onClose}
                            className="block text-sm font-sans text-[#294A3A]/80 hover:text-[#294A3A]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#294A3A]/10 space-y-3">
              <button
                onClick={() => handleAction(openSearch)}
                className="w-full flex items-center space-x-3 p-3 bg-[#F8F5EE] border border-[#294A3A]/15 text-sm uppercase tracking-wider font-medium"
              >
                <Search className="w-4 h-4" />
                <span>Search Products</span>
              </button>

              <button
                onClick={() => handleAction(openAccount)}
                className="w-full flex items-center space-x-3 p-3 bg-[#F8F5EE] border border-[#294A3A]/15 text-sm uppercase tracking-wider font-medium"
              >
                <User className="w-4 h-4" />
                <span>Account &amp; Sign In</span>
              </button>

              <button
                onClick={() => handleAction(openCart)}
                className="w-full flex items-center justify-between p-3 bg-[#294A3A] text-[#FEFBF4] text-sm uppercase tracking-wider font-semibold"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shopping Cart</span>
                </div>
                <span>({totalItems})</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
