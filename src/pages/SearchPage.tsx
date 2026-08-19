import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ecommerce/ProductCard';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Search: "${queryParam}" | Moveon Signs`;
  }, [queryParam]);

  const results = queryParam.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
          p.category.toLowerCase().includes(queryParam.toLowerCase()) ||
          p.description.toLowerCase().includes(queryParam.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(queryParam.toLowerCase()))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl text-[#294A3A]">
            SEARCH STORE
          </h1>

          <form onSubmit={handleSearchSubmit} className="flex items-center border border-[#294A3A]/30 bg-[#F8F5EE] p-2">
            <Search className="w-5 h-5 text-[#294A3A]/60 ml-3 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, materials, signs..."
              className="w-full py-3 bg-transparent text-base outline-none text-[#294A3A]"
            />
            <button type="submit" className="gw-button-primary py-3 px-6 text-xs">
              SEARCH
            </button>
          </form>
        </div>

        {/* Results */}
        {queryParam.trim() !== '' && (
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-[#294A3A]/60 font-semibold border-b border-[#294A3A]/10 pb-4">
              FOUND {results.length} RESULTS FOR "{queryParam}"
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-3">
                <p className="font-serif text-2xl text-[#294A3A]">NO PRODUCTS FOUND</p>
                <p className="text-xs text-[#294A3A]/70 uppercase tracking-wider">
                  Try checking for typos or searching for alternative keywords.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
