import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  Upload,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Lock
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { Product, ProductVariant, ProductSpecification } from '../../types';

export const AdminProductEditor: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const initialProduct =
    PRODUCTS.find((p) => p.id === productId || p.slug === productId) || PRODUCTS[0];

  const [product, setProduct] = useState<Product>({
    ...initialProduct,
    specifications: initialProduct.specifications || [
      { label: 'Glass Clarity', value: 'Ultra-clear low-iron toughened glass' },
      { label: 'Doors', value: 'Dual rear soft-close magnetic doors' },
      { label: 'Weight Capacity', value: '15kg per tier' },
      { label: 'Finish', value: 'Matte Forest Green / Satin Black' }
    ]
  });

  const [selectedPreviewImage, setSelectedPreviewImage] = useState(0);
  const [selectedPreviewVariant, setSelectedPreviewVariant] = useState(0);
  const [openPreviewTab, setOpenPreviewTab] = useState<string | null>('specs');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const formatINR = (val?: number) =>
    val ? `₹${new Intl.NumberFormat('en-IN').format(val)} INR` : '₹0 INR';

  const costPrice = product.costPrice || Math.round(product.price * 0.45);
  const unitProfit = Math.max(0, product.price - costPrice);
  const grossMarginPct = product.price > 0 ? ((unitProfit / product.price) * 100).toFixed(1) : '0.0';

  const handleAddVariant = () => {
    const newV: ProductVariant = {
      id: `v-${Date.now()}`,
      name: 'Custom Finish / Size',
      sku: `MOS-${product.slug.toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-3)}`,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      stock: 10,
      attributes: { Finish: 'Custom' }
    };
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, newV]
    }));
  };

  const handleUpdateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updated = [...product.variants];
    updated[index] = { ...updated[index], [field]: value };
    setProduct((prev) => ({ ...prev, variants: updated }));
  };

  const handleDeleteVariant = (index: number) => {
    if (product.variants.length <= 1) {
      alert('Product must have at least one variant option.');
      return;
    }
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleAddSpec = () => {
    const newSpec: ProductSpecification = { label: 'New Specification', value: 'Specification Details' };
    setProduct((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), newSpec]
    }));
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...(product.specifications || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProduct((prev) => ({ ...prev, specifications: updated }));
  };

  const handleDeleteSpec = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      specifications: (prev.specifications || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddCustomSection = () => {
    const newSection = {
      id: `sec-${Date.now()}`,
      heading: 'CARE & MAINTENANCE',
      content: 'Wipe clean with a damp microfiber cloth. Avoid abrasive detergents and harsh chemicals.'
    };
    setProduct((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection]
    }));
  };

  const handleUpdateCustomSection = (index: number, field: 'heading' | 'content', value: string) => {
    const updated = [...(product.customSections || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProduct((prev) => ({ ...prev, customSections: updated }));
  };

  const handleDeleteCustomSection = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((_, i) => i !== index)
    }));
  };

  const handleDeleteImage = (index: number) => {
    if (product.images.length <= 1) {
      alert('Product must have at least one image.');
      return;
    }
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    if (selectedPreviewImage >= product.images.length - 1) {
      setSelectedPreviewImage(0);
    }
  };

  const handleSaveProduct = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-4 text-slate-900 font-sans xl:h-[calc(100vh-130px)] flex flex-col overflow-hidden">
      {/* Top Sticky Toolbar */}
      <div className="bg-white border border-slate-200 p-4 z-20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin/products')}
            className="p-2 hover:bg-slate-100 text-slate-600 rounded-md transition-colors"
            title="Back to Products"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
                STUDIO PRODUCT EDITOR
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm bg-[#1E3A2B] text-white">
                ACTIVE
              </span>
            </div>
            <h1 className="font-serif text-2xl text-slate-900 font-bold leading-tight">
              {product.name || 'Untitled Product'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={`/products/${product.slug}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center space-x-1.5 rounded-md shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Page</span>
          </a>

          <button
            onClick={() => handleSaveProduct()}
            className="px-5 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'SAVED TO STORE!' : 'SAVE & PUBLISH'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split Editor Canvas */}
      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0 overflow-hidden">
        {/* LEFT COLUMN: Scrollable Form Controls */}
        <div className="xl:w-7/12 h-full overflow-y-auto pr-2 space-y-6 pb-24 scroll-smooth">
          {/* Card 1: Core Information */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-xl text-slate-900 font-bold">General Details</h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Primary Info</span>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Product Title (Customer-Facing H1)
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  placeholder="e.g. Bakery Display Case Pro"
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md text-sm font-semibold text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subtitle / Availability Tagline
                  </label>
                  <input
                    type="text"
                    value={product.subtitle || ''}
                    onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
                    placeholder="e.g. Available for Preorder"
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    URL Handle / Slug
                  </label>
                  <input
                    type="text"
                    value={product.slug}
                    onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none font-mono text-[11px] focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Editorial Description / Summary
                </label>
                <textarea
                  rows={4}
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  placeholder="Enter high-clarity architectural narrative..."
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md outline-none resize-none leading-relaxed focus:border-slate-400 focus:bg-white text-xs"
                />
                <p className="text-[10px] text-slate-400 text-right mt-1 font-mono">
                  {product.description.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Badges & Ratings */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-xl text-slate-900 font-bold">Badges &amp; Customer Reviews</h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Merchandising</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
                <p className="font-bold uppercase text-slate-700 text-[11px]">Visual Status Badges</p>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(product.isBestseller)}
                    onChange={(e) => setProduct({ ...product, isBestseller: e.target.checked })}
                    className="accent-[#C71910] w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Best Seller Badge (Orange Pill)</span>
                    <span className="text-[10px] text-slate-500">Displays prominent 'BEST SELLER' tag</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(product.isNew)}
                    onChange={(e) => setProduct({ ...product, isNew: e.target.checked })}
                    className="accent-[#1E3A2B] w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">New Release Flag</span>
                    <span className="text-[10px] text-slate-500">Displays 'NEW' collection badge</span>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
                <p className="font-bold uppercase text-slate-700 text-[11px]">Ratings &amp; Social Proof</p>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Star Score (0.0 to 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={product.rating || 4.9}
                    onChange={(e) => setProduct({ ...product, rating: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-200 p-2 rounded-md font-bold text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Verified Reviews Count
                  </label>
                  <input
                    type="number"
                    value={product.reviewCount || 38}
                    onChange={(e) => setProduct({ ...product, reviewCount: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-200 p-2 rounded-md font-bold text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Pricing in INR (₹) & Internal Unit Economics */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-serif text-xl text-slate-900 font-bold">Pricing &amp; Unit Economics (INR ₹)</h2>
                <p className="text-xs text-slate-500">Configure public selling price and confidential making cost</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Currency: INR (₹)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Public Selling Price (₹ INR)
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md">
                  <span className="font-bold text-sm text-slate-900 mr-1">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                    className="bg-transparent font-bold text-base text-slate-900 outline-none w-full font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold uppercase tracking-wider text-slate-700">
                    Making Cost (COGS)
                  </label>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1 rounded font-mono font-bold flex items-center">
                    <Lock className="w-2.5 h-2.5 mr-0.5" /> ADMIN ONLY
                  </span>
                </div>
                <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md">
                  <span className="font-bold text-sm text-slate-600 mr-1">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={product.costPrice || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        costPrice: e.target.value ? Number(e.target.value) : undefined
                      })
                    }
                    placeholder="e.g. 17500"
                    className="bg-transparent font-bold text-base text-slate-700 outline-none w-full font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Compare-at Price (₹)
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md">
                  <span className="font-bold text-sm text-slate-400 mr-1">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={product.compareAtPrice || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        compareAtPrice: e.target.value ? Number(e.target.value) : undefined
                      })
                    }
                    placeholder="e.g. 38990"
                    className="bg-transparent font-bold text-base text-slate-400 line-through outline-none w-full font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Live Realized Profit Banner */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-emerald-900 font-bold">Net Unit Profit:</span>
                <span className="font-mono font-bold text-base text-emerald-900">
                  +{formatINR(unitProfit)}
                </span>
                <span className="text-slate-500 text-[11px]">
                  (Selling {formatINR(product.price)} - Cost {formatINR(costPrice)})
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase bg-white border border-emerald-300 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  {grossMarginPct}% Gross Margin
                </span>
                <span className="text-[10px] font-mono text-emerald-700">
                  {((unitProfit / Math.max(1, costPrice)) * 100).toFixed(0)}% ROI Markup
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Media Gallery & Images */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-serif text-xl text-slate-900 font-bold">Image Gallery &amp; Photos</h2>
                <p className="text-xs text-slate-500">Upload high-res product photos from your device</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {product.images.length} Photos
              </span>
            </div>

            {/* Drag and Drop / Click File Upload Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const newUrls: string[] = [];
                  Array.from(e.dataTransfer.files).forEach((file) => {
                    if (file.type.startsWith('image/')) {
                      newUrls.push(URL.createObjectURL(file));
                    }
                  });
                  if (newUrls.length > 0) {
                    setProduct((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
                  }
                }
              }}
              className="border-2 border-dashed border-slate-300 hover:border-[#1E3A2B] bg-slate-50 hover:bg-emerald-50/30 rounded-lg p-6 text-center transition-all cursor-pointer group"
              onClick={() => document.getElementById('file-upload-input')?.click()}
            >
              <input
                id="file-upload-input"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const newUrls: string[] = [];
                    Array.from(e.target.files).forEach((file) => {
                      if (file.type.startsWith('image/')) {
                        newUrls.push(URL.createObjectURL(file));
                      }
                    });
                    if (newUrls.length > 0) {
                      setProduct((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
                    }
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-[#1E3A2B] group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#1E3A2B] hover:underline">Click to upload</span> or drag and drop photos here
                </div>
                <p className="text-[10px] text-slate-400">
                  PNG, JPG, WEBP, AVIF up to 10MB each. Multiple files supported.
                </p>
              </div>
            </div>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`group relative aspect-[3/4] bg-slate-100 border overflow-hidden rounded-md ${
                    idx === 0 ? 'border-[#1E3A2B] ring-2 ring-[#1E3A2B]/20' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 ? (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#1E3A2B] text-white text-[9px] font-bold uppercase rounded-xs shadow-xs">
                      Primary
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const imgs = [...product.images];
                        const [moved] = imgs.splice(idx, 1);
                        imgs.unshift(moved);
                        setProduct({ ...product, images: imgs });
                        setSelectedPreviewImage(0);
                      }}
                      className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-slate-900/80 hover:bg-slate-900 text-white text-[9px] font-semibold uppercase rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Set as primary image"
                    >
                      Make Primary
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(idx);
                    }}
                    className="absolute top-1.5 right-1.5 p-1 bg-slate-900/80 text-white hover:bg-[#C71910] rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Finish / Option Variants */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-serif text-xl text-slate-900 font-bold">
                  Finish / Option Variants
                </h2>
                <p className="text-xs text-slate-500">
                  Custom finishes, powdercoat colors, and sizes
                </p>
              </div>
              <button
                onClick={handleAddVariant}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-bold uppercase transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Variant</span>
              </button>
            </div>

            <div className="space-y-3">
              {product.variants.map((v, vIdx) => (
                <div
                  key={v.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold uppercase text-[11px] text-slate-700">
                      Variant #{vIdx + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteVariant(vIdx)}
                      className="text-slate-400 hover:text-[#C71910] p-1 transition-colors"
                      title="Delete Variant"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                        Option Label (e.g. Satin Black / Medium)
                      </label>
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => handleUpdateVariant(vIdx, 'name', e.target.value)}
                        className="w-full bg-white border border-slate-200 p-2 rounded-md font-bold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                        Price (₹ INR)
                      </label>
                      <input
                        type="number"
                        value={v.price}
                        onChange={(e) =>
                          handleUpdateVariant(vIdx, 'price', Number(e.target.value))
                        }
                        className="w-full bg-white border border-slate-200 p-2 rounded-md font-bold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                        In Stock (Units)
                      </label>
                      <input
                        type="number"
                        value={v.stock || 10}
                        onChange={(e) =>
                          handleUpdateVariant(vIdx, 'stock', Number(e.target.value))
                        }
                        className="w-full bg-white border border-slate-200 p-2 rounded-md font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Specifications Accordion */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-serif text-xl text-slate-900 font-bold">
                  Technical Specifications Table
                </h2>
                <p className="text-xs text-slate-500">
                  Key-value attributes shown in the 'Product Specifications' accordion
                </p>
              </div>
              <button
                onClick={handleAddSpec}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-bold uppercase transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Spec Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {(product.specifications || []).map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center space-x-3 p-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
                >
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleUpdateSpec(sIdx, 'label', e.target.value)}
                    placeholder="e.g. Glass Clarity"
                    className="w-1/3 bg-white border border-slate-200 p-2 rounded-md font-bold outline-none"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleUpdateSpec(sIdx, 'value', e.target.value)}
                    placeholder="e.g. Ultra-clear low-iron glass"
                    className="flex-1 bg-white border border-slate-200 p-2 rounded-md outline-none"
                  />
                  <button
                    onClick={() => handleDeleteSpec(sIdx)}
                    className="p-1.5 text-slate-400 hover:text-[#C71910]"
                    title="Delete spec"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 7: Accordion Policies & Custom Heading/Content Sections */}
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <h2 className="font-serif text-xl text-slate-900 font-bold">
                  Accordion Headings &amp; Custom Content
                </h2>
                <p className="text-xs text-slate-500">
                  Add custom headings and detailed content sections to this product
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddCustomSection}
                className="px-3 py-1.5 bg-slate-100 hover:bg-[#1E3A2B] hover:text-white text-slate-700 rounded-md text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-2xs w-fit"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Heading &amp; Content</span>
              </button>
            </div>

            {/* Standard Built-in Accordions */}
            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Materials &amp; Finish Accordion
                </label>
                <textarea
                  rows={2}
                  value={product.materials || ''}
                  onChange={(e) => setProduct({ ...product, materials: e.target.value })}
                  placeholder="e.g. High-clarity toughened glass, 304 powder-coated stainless steel..."
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none resize-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Dimensions &amp; Weight Accordion
                </label>
                <textarea
                  rows={2}
                  value={product.dimensions || ''}
                  onChange={(e) => setProduct({ ...product, dimensions: e.target.value })}
                  placeholder="e.g. Height: 480mm | Width: 650mm | Depth: 400mm | Weight: 14.2kg"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none resize-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Shipping &amp; Dispatch Accordion
                </label>
                <textarea
                  rows={2}
                  value={product.shippingInfo || ''}
                  onChange={(e) => setProduct({ ...product, shippingInfo: e.target.value })}
                  placeholder="e.g. Free express courier across India for orders over ₹4,999."
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none resize-none focus:bg-white"
                />
              </div>
            </div>

            {/* Dynamic Custom Heading & Content Sections */}
            {(product.customSections || []).length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Custom Heading &amp; Content Sections ({(product.customSections || []).length})
                  </span>
                </div>

                <div className="space-y-4">
                  {(product.customSections || []).map((section, idx) => (
                    <div
                      key={section.id || idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Heading Title #{idx + 1}
                          </label>
                          <input
                            type="text"
                            value={section.heading}
                            onChange={(e) =>
                              handleUpdateCustomSection(idx, 'heading', e.target.value)
                            }
                            placeholder="e.g. CARE &amp; MAINTENANCE or INSTALLATION MANUAL"
                            className="w-full bg-white border border-slate-200 p-2 rounded-md font-bold text-xs outline-none focus:border-slate-400 uppercase"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomSection(idx)}
                          className="p-2 text-slate-400 hover:text-[#C71910] hover:bg-red-50 rounded-md transition-colors self-end"
                          title="Delete custom section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Section Content / Narrative
                        </label>
                        <textarea
                          rows={3}
                          value={section.content}
                          onChange={(e) =>
                            handleUpdateCustomSection(idx, 'content', e.target.value)
                          }
                          placeholder="Enter details, instructions, warranty policies or guidelines..."
                          className="w-full bg-white border border-slate-200 p-2.5 rounded-md text-xs outline-none resize-none leading-relaxed focus:border-slate-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Fixed Live Storefront Preview Panel */}
        <div className="xl:w-5/12 h-full flex flex-col min-h-0 overflow-hidden">
          <div className="bg-white border-2 border-slate-900 shadow-xl rounded-lg h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                  LIVE STOREFRONT PREVIEW
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                Fixed Panel • Real-Time
              </span>
            </div>

            {/* Simulated Customer PDP */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth">
              {/* Image Preview & Thumbnails */}
              <div className="space-y-3">
                <div className="relative aspect-[4/4.5] bg-slate-50 overflow-hidden border border-slate-200 rounded-md">
                  <img
                    src={product.images[selectedPreviewImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="absolute top-3 left-3 bg-[#C71910] text-white text-[10px] font-bold uppercase px-2.5 py-1 tracking-wider rounded-xs">
                      SALE
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPreviewImage(idx)}
                        className={`w-14 h-16 flex-shrink-0 border rounded overflow-hidden ${
                          selectedPreviewImage === idx
                            ? 'border-slate-900 ring-1 ring-slate-900'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Badges & Titles */}
              <div className="space-y-2">
                {product.isBestseller && (
                  <span className="inline-block bg-orange-100 text-[#C71910] text-[10px] font-bold uppercase px-2.5 py-0.5 tracking-wider font-mono rounded">
                    BEST SELLER
                  </span>
                )}

                <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-medium leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-800">
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                  <span className="font-bold font-mono">{product.rating || 4.9}</span>
                  <span className="text-slate-400">({product.reviewCount || 38} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3 pt-1">
                  <span className="text-xl font-bold font-sans text-slate-900">
                    {formatINR(product.variants[selectedPreviewVariant]?.price || product.price)}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-xs text-slate-400 line-through font-normal">
                      {formatINR(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-3">
                {product.description}
              </p>

              {/* Finish Options Pills */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex justify-between">
                  <span>FINISH / OPTION:</span>
                  <span className="text-slate-500">
                    {product.variants[selectedPreviewVariant]?.name || 'Standard'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedPreviewVariant(idx)}
                      className={`p-2.5 text-[11px] font-bold uppercase tracking-wider border rounded-md transition-all text-center ${
                        selectedPreviewVariant === idx
                          ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  disabled
                  className="w-full bg-[#1E3A2B] text-white py-3 text-xs uppercase font-bold tracking-widest cursor-default rounded-md shadow-xs"
                >
                  ADD TO CART
                </button>
                <button
                  disabled
                  className="w-full bg-white border border-slate-300 text-slate-800 py-3 text-xs uppercase font-bold tracking-widest cursor-default rounded-md"
                >
                  BUY IT NOW
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center text-[9px] font-bold uppercase text-slate-500">
                <div className="flex flex-col items-center">
                  <Truck className="w-3.5 h-3.5 mb-1" />
                  <span>PAN-INDIA FREIGHT</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mb-1" />
                  <span>LIFETIME GUARANTEE</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-3.5 h-3.5 mb-1" />
                  <span>30 DAY RETURNS</span>
                </div>
              </div>

              {/* Interactive Accordion Preview */}
              <div className="divide-y divide-slate-100 border-b border-slate-100 text-xs">
                {/* Specifications Accordion */}
                <div className="py-2.5">
                  <button
                    onClick={() =>
                      setOpenPreviewTab(openPreviewTab === 'specs' ? null : 'specs')
                    }
                    className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-slate-800"
                  >
                    <span>PRODUCT SPECIFICATIONS</span>
                    {openPreviewTab === 'specs' ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {openPreviewTab === 'specs' && (
                    <div className="mt-2 space-y-1 bg-slate-50 p-2.5 rounded-md text-[11px]">
                      {(product.specifications || []).map((s, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-slate-200/60 last:border-none">
                          <span className="text-slate-500 font-medium">{s.label}:</span>
                          <span className="font-bold text-slate-900 text-right">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materials Accordion */}
                <div className="py-2.5">
                  <button
                    onClick={() =>
                      setOpenPreviewTab(openPreviewTab === 'materials' ? null : 'materials')
                    }
                    className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-slate-800"
                  >
                    <span>MATERIALS &amp; FINISH</span>
                    {openPreviewTab === 'materials' ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {openPreviewTab === 'materials' && (
                    <p className="mt-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-md">
                      {product.materials || 'High-clarity architectural materials.'}
                    </p>
                  )}
                </div>

                {/* Dimensions Accordion */}
                <div className="py-2.5">
                  <button
                    onClick={() =>
                      setOpenPreviewTab(openPreviewTab === 'dim' ? null : 'dim')
                    }
                    className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-slate-800"
                  >
                    <span>DIMENSIONS &amp; WEIGHT</span>
                    {openPreviewTab === 'dim' ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {openPreviewTab === 'dim' && (
                    <p className="mt-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-md">
                      {product.dimensions || 'Precision architectural measurements.'}
                    </p>
                  )}
                </div>

                {/* Dynamic Custom Sections in Preview */}
                {(product.customSections || []).map((sec, idx) => (
                  <div key={sec.id || idx} className="py-2.5">
                    <button
                      onClick={() =>
                        setOpenPreviewTab(openPreviewTab === sec.id ? null : sec.id)
                      }
                      className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-slate-800"
                    >
                      <span>{sec.heading || `SECTION #${idx + 1}`}</span>
                      {openPreviewTab === sec.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {openPreviewTab === sec.id && (
                      <p className="mt-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-md whitespace-pre-line">
                        {sec.content || 'Custom section content...'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
