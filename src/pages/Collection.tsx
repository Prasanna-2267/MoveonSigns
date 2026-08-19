import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ecommerce/ProductCard';
import { CustomSelect } from '../components/common/CustomSelect';

export const CollectionPage: React.FC = () => {
  const { collectionSlug = 'all-products' } = useParams<{ collectionSlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>(searchParams.get('tag') || 'all');
  const sortParam = searchParams.get('sort') || 'featured';

  // Find active collection
  const collection = useMemo(() => {
    return (
      COLLECTIONS.find((c) => c.slug === collectionSlug) || {
        id: collectionSlug,
        slug: collectionSlug,
        title: collectionSlug.replace(/-/g, ' ').toUpperCase(),
        subtitle: 'Boutique display and signage solutions.',
        description: 'Explore our carefully curated architectural product designs.'
      }
    );
  }, [collectionSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${collection.title} | Moveon Signs`;
  }, [collection]);

  // Filter products by collection slug and tag
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    if (collectionSlug !== 'all-products') {
      list = list.filter((p) => p.collections.includes(collectionSlug));
    }

    if (selectedTag !== 'all') {
      list = list.filter(
        (p) =>
          p.category.toLowerCase() === selectedTag.toLowerCase() ||
          p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      ) as typeof list;
    }

    // Sort products
    const sorted = [...list];
    switch (sortParam) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'title-a-z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'title-z-a':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'best-selling':
        sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        // 'featured'
        break;
    }

    // Move all out-of-stock products to the very end
    sorted.sort((a, b) => {
      const aOut = (a.variants.length > 0 && a.variants.every((v) => (v.stock ?? 10) === 0)) ? 1 : 0;
      const bOut = (b.variants.length > 0 && b.variants.every((v) => (v.stock ?? 10) === 0)) ? 1 : 0;
      return aOut - bOut;
    });

    return sorted;
  }, [collectionSlug, selectedTag, sortParam]);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    const params = new URLSearchParams(searchParams);
    if (tag === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    setSearchParams(params);
  };

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-12 md:py-20">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-12">
        {/* Collection Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#294A3A]/60 font-semibold">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/collections/all-products" className="hover:underline">Collections</Link>
            <span>/</span>
            <span className="text-[#294A3A] font-bold">{collection.title}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#294A3A] leading-tight">
            {collection.title}
          </h1>

          <p className="text-sm md:text-base text-[#294A3A]/80 leading-relaxed font-sans">
            {collection.description}
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-[#294A3A]/15 py-4 gap-4">
          {/* Left: Filter Toggle & Count */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#294A3A] hover:opacity-75 transition-opacity"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>FILTERS {selectedTag !== 'all' && `(${selectedTag.toUpperCase()})`}</span>
            </button>
            <span className="text-xs text-[#294A3A]/60 font-mono">
              {filteredProducts.length} PRODUCTS
            </span>
          </div>

          {/* Right: Sort Select Dropdown */}
          <div className="flex items-center space-x-3">
            <label className="text-xs uppercase tracking-widest text-[#294A3A]/60 font-semibold hidden sm:inline">
              SORT BY:
            </label>
            <CustomSelect
              variant="storefront"
              value={sortParam}
              onChange={handleSortChange}
              options={[
                { value: 'featured', label: 'Featured / Relevant' },
                { value: 'best-selling', label: 'Best Selling' },
                { value: 'price-low-high', label: 'Price: Low to High' },
                { value: 'price-high-low', label: 'Price: High to Low' },
                { value: 'title-a-z', label: 'Alphabetically: A-Z' },
                { value: 'title-z-a', label: 'Alphabetically: Z-A' }
              ]}
              className="min-w-[190px]"
            />
          </div>
        </div>

        {/* Filter Drawer / Accordion */}
        {isFilterOpen && (
          <div className="bg-[#F8F5EE] p-6 border border-[#294A3A]/15 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-[#294A3A]/10">
              <span className="text-xs uppercase tracking-widest font-bold text-[#294A3A]">
                FILTER BY CATEGORY &amp; TYPE
              </span>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-xs text-[#294A3A]/60 hover:text-[#294A3A] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['all', 'Signage', 'Menu Displays', 'Furniture', 'Tabletop', 'Counter Display', 'Glass', 'Wood'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all ${
                      selectedTag.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#294A3A] text-[#FEFBF4] border-[#294A3A]'
                        : 'bg-[#FEFBF4] text-[#294A3A] border-[#294A3A]/20 hover:border-[#294A3A]'
                    }`}
                  >
                    {tag === 'all' ? 'All Categories' : tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <p className="font-serif text-3xl text-[#294A3A]">NO MATCHING PRODUCTS</p>
            <p className="text-xs uppercase tracking-wider text-[#294A3A]/60">
              Try resetting your selected filters to explore more items.
            </p>
            <button
              onClick={() => handleTagChange('all')}
              className="gw-button-primary mt-4"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
