import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { PRODUCTS } from '../../data/products';
import { COLLECTIONS } from '../../data/collections';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const matchedCollections = searchQuery.trim()
    ? COLLECTIONS.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : COLLECTIONS.slice(0, 4);

  const handleProductClick = (slug: string) => {
    closeSearch();
    setSearchQuery('');
    navigate(`/products/${slug}`);
  };

  const handleCollectionClick = (slug: string) => {
    closeSearch();
    setSearchQuery('');
    navigate(`/collections/${slug}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#FEFBF4] z-50 overflow-y-auto flex flex-col justify-start"
        >
          {/* Top Search Bar */}
          <div className="border-b border-[#294A3A]/15 px-6 py-6 md:px-16 flex items-center justify-between">
            <div className="flex-1 max-w-4xl mx-auto flex items-center space-x-4">
              <Search className="w-6 h-6 text-[#294A3A]/60" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH FOR SIGNAGE, MENU BOARDS, DISPLAY CASES..."
                className="w-full bg-transparent text-xl md:text-3xl font-serif text-[#294A3A] placeholder-[#294A3A]/40 outline-none uppercase tracking-wide"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs uppercase text-[#294A3A]/60 hover:text-[#294A3A] underline"
                >
                  CLEAR
                </button>
              )}
            </div>
            <button
              onClick={closeSearch}
              className="p-2 hover:bg-[#294A3A]/5 rounded-full transition-colors ml-4"
              aria-label="Close search"
            >
              <X className="w-7 h-7 text-[#294A3A]" />
            </button>
          </div>

          {/* Results Container */}
          <div className="max-w-6xl mx-auto w-full px-6 py-12 flex-1">
            {searchQuery.trim() === '' ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#294A3A]/60 font-semibold mb-4">
                    POPULAR COLLECTIONS
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {matchedCollections.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => handleCollectionClick(col.slug)}
                        className="p-4 border border-[#294A3A]/15 text-left hover:border-[#294A3A] hover:bg-[#F8F5EE] transition-all"
                      >
                        <h4 className="font-serif text-lg text-[#294A3A]">{col.title}</h4>
                        <p className="text-xs text-[#294A3A]/60 mt-1 line-clamp-2">{col.subtitle}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#294A3A]/60 font-semibold mb-4">
                    FEATURED PRODUCTS
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {PRODUCTS.slice(0, 4).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="cursor-pointer group space-y-2"
                      >
                        <div className="aspect-[4/5] bg-[#F8F5EE] overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-sm text-[#294A3A] group-hover:underline">
                          {product.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#294A3A]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#294A3A]/10">
                  <p className="text-xs uppercase tracking-widest text-[#294A3A]/60">
                    FOUND {filteredProducts.length} PRODUCTS FOR "{searchQuery}"
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="cursor-pointer group space-y-2"
                    >
                      <div className="aspect-[4/5] bg-[#F8F5EE] overflow-hidden relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <span className="absolute top-2 left-2 bg-[#C71910] text-[#FEFBF4] text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-sm text-[#294A3A] group-hover:underline">
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#294A3A]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <p className="font-serif text-3xl text-[#294A3A]">NO RESULTS FOUND</p>
                <p className="text-sm text-[#294A3A]/70 max-w-md mx-auto">
                  We couldn't find any products matching "{searchQuery}". Try checking for spelling errors or search for broader keywords like "Sign", "Menu", or "Table".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="gw-button-secondary mt-4"
                >
                  VIEW ALL PRODUCTS
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
