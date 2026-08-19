import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ecommerce/ProductCard';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export const ProductDetail: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const product = PRODUCTS.find((p) => p.slug === productSlug) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState<string | null>('details');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedVariant(product.variants[0]);
      document.title = `${product.name} | Moveon Signs`;
    }
  }, [productSlug, product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl text-[#294A3A]">PRODUCT NOT FOUND</h1>
        <Link to="/collections/all-products" className="gw-button-primary">
          BACK TO ALL PRODUCTS
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price ?? product.price;
  const comparePrice = selectedVariant?.compareAtPrice ?? product.compareAtPrice;
  const isOnSale = comparePrice && comparePrice > currentPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigate('/cart');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.collections.some((c) => product.collections.includes(c))
  ).slice(0, 4);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-10 md:py-16">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#294A3A]/60 font-semibold">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/collections/all-products" className="hover:underline">Shop</Link>
          <span>/</span>
          <Link to={`/collections/${product.collections[0] || 'all-products'}`} className="hover:underline">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#294A3A] font-bold">{product.name}</span>
        </div>

        {/* Main Product Layout (2 columns desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] bg-[#F8F5EE] border border-[#294A3A]/10 overflow-hidden relative group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              />
              {isOnSale && (
                <span className="absolute top-4 left-4 bg-[#C71910] text-[#FEFBF4] text-xs font-bold tracking-widest uppercase px-3 py-1">
                  SALE
                </span>
              )}
            </div>

            {/* Thumbnail Selector */}
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-24 border bg-[#F8F5EE] overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-[#294A3A] ring-1 ring-[#294A3A]'
                        : 'border-[#294A3A]/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="space-y-2 border-b border-[#294A3A]/10 pb-6">
              {product.isBestseller && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C71910] bg-[#C71910]/10 px-2.5 py-1">
                  BEST SELLER
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#294A3A] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 text-xs text-[#294A3A]">
                <div className="flex text-[#294A3A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                  ))}
                </div>
                <span className="font-bold">{product.rating || 4.9}</span>
                <span className="text-[#294A3A]/60">({product.reviewCount || 34} reviews)</span>
              </div>

              {/* Price Display */}
              <div className="pt-2 flex items-center space-x-3 text-xl font-bold font-sans">
                <span className="text-[#294A3A]">{formatPrice(currentPrice)}</span>
                {isOnSale && (
                  <span className="text-sm text-[#294A3A]/40 line-through font-normal">
                    {formatPrice(comparePrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#294A3A]/85 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Variant Selectors */}
            {product.variants.length > 1 && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs uppercase tracking-widest text-[#294A3A] font-bold">
                  FINISH / OPTION: <span className="font-normal text-[#294A3A]/70">{selectedVariant.name}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 text-xs uppercase tracking-wider font-semibold border text-left transition-all ${
                        selectedVariant.id === variant.id
                          ? 'bg-[#294A3A] text-[#FEFBF4] border-[#294A3A]'
                          : 'bg-[#FEFBF4] text-[#294A3A] border-[#294A3A]/20 hover:border-[#294A3A]'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-[#294A3A]/10">
              <div className="flex items-center space-x-4">
                <label className="text-xs uppercase tracking-widest text-[#294A3A] font-bold hidden sm:block">
                  QTY:
                </label>
                <div className="flex items-center border border-[#294A3A]/30 bg-[#F8F5EE]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-[#294A3A]/10 text-[#294A3A]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#294A3A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-[#294A3A]/10 text-[#294A3A]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 gw-button-primary py-4 text-xs tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full gw-button-secondary py-4 text-xs tracking-widest"
              >
                BUY IT NOW
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center border-t border-[#294A3A]/10 text-[11px] text-[#294A3A]/80 uppercase tracking-wider">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-5 h-5 text-[#294A3A]/60" />
                <span>Worldwide Freight</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#294A3A]/60" />
                <span>Lifetime Guarantee</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RotateCcw className="w-5 h-5 text-[#294A3A]/60" />
                <span>30 Day Returns</span>
              </div>
            </div>

            {/* Collapsible Accordion Info Sections */}
            <div className="border-t border-[#294A3A]/15 divide-y divide-[#294A3A]/10 pt-2">
              {/* Specifications */}
              <div className="py-3">
                <button
                  onClick={() => setOpenTab(openTab === 'details' ? null : 'details')}
                  className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#294A3A] py-1"
                >
                  <span>PRODUCT SPECIFICATIONS</span>
                  {openTab === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openTab === 'details' && (
                  <div className="pt-3 text-xs text-[#294A3A]/80 space-y-2 animate-fade-in">
                    {product.specifications?.map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-[#294A3A]/5 pb-1">
                        <span className="font-semibold">{spec.label}:</span>
                        <span>{spec.value}</span>
                      </div>
                    )) || <p>Crafted to commercial design standards.</p>}
                  </div>
                )}
              </div>

              {/* Materials */}
              <div className="py-3">
                <button
                  onClick={() => setOpenTab(openTab === 'materials' ? null : 'materials')}
                  className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#294A3A] py-1"
                >
                  <span>MATERIALS &amp; FINISH</span>
                  {openTab === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openTab === 'materials' && (
                  <p className="pt-3 text-xs text-[#294A3A]/80 leading-relaxed animate-fade-in">
                    {product.materials || 'Sustainable powder-coated aluminum and high-clarity low-iron glass.'}
                  </p>
                )}
              </div>

              {/* Dimensions */}
              <div className="py-3">
                <button
                  onClick={() => setOpenTab(openTab === 'dimensions' ? null : 'dimensions')}
                  className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#294A3A] py-1"
                >
                  <span>DIMENSIONS &amp; WEIGHT</span>
                  {openTab === 'dimensions' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openTab === 'dimensions' && (
                  <p className="pt-3 text-xs text-[#294A3A]/80 leading-relaxed animate-fade-in">
                    {product.dimensions || 'Dimensions vary by variant selection.'}
                  </p>
                )}
              </div>

              {/* Shipping */}
              <div className="py-3">
                <button
                  onClick={() => setOpenTab(openTab === 'shipping' ? null : 'shipping')}
                  className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#294A3A] py-1"
                >
                  <span>SHIPPING &amp; DISPATCH</span>
                  {openTab === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openTab === 'shipping' && (
                  <p className="pt-3 text-xs text-[#294A3A]/80 leading-relaxed animate-fade-in">
                    {product.shippingInfo || 'Free express shipping across India on all orders over ₹4,999 INR. Dispatches within 2-3 business days.'}
                  </p>
                )}
              </div>

              {/* Dynamic Custom Heading & Content Sections */}
              {product.customSections?.map((section) => (
                <div key={section.id} className="py-3">
                  <button
                    onClick={() => setOpenTab(openTab === section.id ? null : section.id)}
                    className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#294A3A] py-1"
                  >
                    <span>{section.heading}</span>
                    {openTab === section.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openTab === section.id && (
                    <p className="pt-3 text-xs text-[#294A3A]/80 leading-relaxed animate-fade-in whitespace-pre-line">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#294A3A]/10 space-y-8">
            <h2 className="font-serif text-2xl md:text-3xl text-[#294A3A] text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
