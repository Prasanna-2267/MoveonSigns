import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, X, Upload, TrendingUp, Lock, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { CustomSelect } from '../../components/common/CustomSelect';

export const AdminProducts: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCostPrice, setNewCostPrice] = useState(''); // Internal Making Cost / COGS
  const [newCompareAtPrice, setNewCompareAtPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Signage');
  const [newDescription, setNewDescription] = useState('');
  const [newStock, setNewStock] = useState('15');
  const [newImages, setNewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
  ]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  const filtered = productsList
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.slug && p.slug.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      const aOut = a.variants.every((v) => (v.stock ?? 10) === 0) ? 1 : 0;
      const bOut = b.variants.every((v) => (v.stock ?? 10) === 0) ? 1 : 0;
      return aOut - bOut;
    });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to archive this product?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const sellingPriceNum = Number(newPrice);
    const makingCostNum = newCostPrice ? Number(newCostPrice) : Math.round(sellingPriceNum * 0.45);

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newTitle,
      price: sellingPriceNum,
      costPrice: makingCostNum, // Making Cost (Internal Admin Only)
      compareAtPrice: newCompareAtPrice ? Number(newCompareAtPrice) : undefined,
      currency: 'INR',
      images: newImages.length > 0 ? newImages : ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'],
      category: newCategory,
      collections: ['all-products'],
      variants: [
        {
          id: `v-${Date.now()}`,
          name: 'Standard',
          sku: `SKU-${Date.now().toString().slice(-4)}`,
          price: sellingPriceNum,
          costPrice: makingCostNum,
          stock: Number(newStock) || 10,
          attributes: {}
        }
      ],
      description: newDescription || 'Premium minimal architectural signage crafted for modern spaces in India.',
      tags: ['New', newCategory]
    };

    setProductsList([newProd, ...productsList]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle('');
    setNewPrice('');
    setNewCostPrice('');
    setNewCompareAtPrice('');
    setNewDescription('');
    setNewStock('15');
    setNewImages(['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80']);
  };

  // Real-time calculation in modal
  const sellingNum = Number(newPrice) || 0;
  const costNum = Number(newCostPrice) || 0;
  const unitProfit = Math.max(0, sellingNum - costNum);
  const marginPct = sellingNum > 0 ? ((unitProfit / sellingNum) * 100).toFixed(1) : '0.0';

  // Overall catalog metrics
  const totalCatalogRetailValue = productsList.reduce((acc, p) => acc + p.price * (p.variants[0]?.stock || 10), 0);
  const totalCatalogCostValue = productsList.reduce((acc, p) => acc + (p.costPrice || p.price * 0.45) * (p.variants[0]?.stock || 10), 0);
  const totalGrossProfitPotential = totalCatalogRetailValue - totalCatalogCostValue;
  const averageCatalogMargin = ((totalGrossProfitPotential / totalCatalogRetailValue) * 100).toFixed(1);

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Product Catalog &amp; Economics</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Retail Pricing, Making Costs (COGS) &amp; Net Profit Margins
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Catalog Financial Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            TOTAL INVENTORY RETAIL VALUE
          </span>
          <div className="text-2xl font-bold font-sans text-slate-900">
            {formatINR(totalCatalogRetailValue)}
          </div>
          <p className="text-[11px] text-slate-500">{productsList.length} unique SKUs in catalog</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
              TOTAL MAKING COST (COGS)
            </span>
            <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">
              ADMIN ONLY
            </span>
          </div>
          <div className="text-2xl font-bold font-sans text-slate-700">
            {formatINR(totalCatalogCostValue)}
          </div>
          <p className="text-[11px] text-slate-500">Manufacturing &amp; material expense</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            NET GROSS PROFIT POTENTIAL
          </span>
          <div className="text-2xl font-bold font-sans text-emerald-700">
            {formatINR(totalGrossProfitPotential)}
          </div>
          <p className="text-[11px] text-emerald-600 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +{averageCatalogMargin}% Avg Store Margin
          </p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            HIGHEST MARGIN PRODUCT
          </span>
          <div className="text-xl font-bold font-mono text-[#1E3A2B]">Bakery Display Pro</div>
          <p className="text-[11px] text-slate-500">₹17,490 net profit per unit (50.0%)</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 border border-slate-200 rounded-lg shadow-xs gap-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product title, SKU, category..."
              className="bg-transparent text-xs text-slate-800 outline-none w-full"
            />
          </div>

          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'Signage', label: 'Signage' },
              { value: 'Menu Displays', label: 'Menu Displays' },
              { value: 'Counter Display Cases', label: 'Display Cases' },
              { value: 'Furniture', label: 'Furniture' },
              { value: 'Tabletop Signs', label: 'Tabletop' }
            ]}
            className="w-48"
          />
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {filtered.length} of {productsList.length} products
        </div>
      </div>

      {/* Products Table with Making Cost & Margin */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Retail Price (INR)</th>
                <th className="py-3.5 px-4">
                  <span className="flex items-center space-x-1" title="Internal confidential cost, admin only">
                    <span>Making Cost (COGS)</span>
                    <Lock className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3.5 px-4">Unit Profit &amp; Margin</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => {
                const cost = prod.costPrice || Math.round(prod.price * 0.45);
                const profit = prod.price - cost;
                const margin = ((profit / prod.price) * 100).toFixed(1);

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product Name & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-14 object-cover border border-slate-200 rounded-md bg-slate-50"
                        />
                        <div>
                          <Link
                            to={`/admin/products/edit/${prod.id}`}
                            className="font-bold text-sm text-slate-900 hover:text-[#1E3A2B] hover:underline"
                          >
                            {prod.name}
                          </Link>
                          <p className="text-[10px] text-slate-400 font-mono">{prod.slug}</p>
                          {prod.isBestseller && (
                            <span className="text-[9px] font-bold text-[#C71910] uppercase mr-2">
                              ★ Bestseller
                            </span>
                          )}
                          {prod.isNew && (
                            <span className="text-[9px] font-bold text-[#1E3A2B] uppercase">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{prod.category}</td>

                    {/* Retail Price */}
                    <td className="py-3.5 px-4 font-bold text-sm font-sans text-slate-900">
                      {formatINR(prod.price)}
                      {prod.compareAtPrice && (
                        <span className="block text-[10px] text-slate-400 line-through font-normal">
                          {formatINR(prod.compareAtPrice)}
                        </span>
                      )}
                    </td>

                    {/* Making Cost (Internal) */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                        {formatINR(cost)}
                      </span>
                    </td>

                    {/* Unit Profit & Margin */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs text-emerald-800 font-sans block">
                          +{formatINR(profit)}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block font-semibold">
                          {margin}% Margin
                        </span>
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-slate-800">
                        {prod.variants.reduce((acc, v) => acc + (v.stock || 10), 0)}
                      </span>{' '}
                      units
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ACTIVE
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2 text-slate-600">
                        {/* Luxury Studio Editor Button */}
                        <Link
                          to={`/admin/products/edit/${prod.id}`}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-[#172E22] to-[#224231] hover:from-[#0F1E16] hover:to-[#172E22] text-[#FEFBF4] hover:text-white rounded-md border border-[#2B4B3B] hover:border-amber-400/50 shadow-xs hover:shadow-sm flex items-center space-x-2 text-xs font-semibold tracking-wide transition-all duration-200 group"
                          title="Open Studio Editor"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="font-sans">Studio Edit</span>
                        </Link>

                        {/* Archive / Delete Button */}
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-[#C71910] hover:bg-red-50 rounded-md transition-colors"
                          title="Archive product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal with Making Cost */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Add New Catalog Product</h3>
                <p className="text-xs text-slate-500">Configure pricing, internal making costs &amp; media</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-bold tracking-wider text-slate-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Architectural Hanging Blade Sign"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
                />
              </div>

              {/* Pricing & Making Cost Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-lg">
                <div>
                  <label className="block uppercase font-bold tracking-wider text-slate-700 mb-1">
                    Selling Price (INR ₹)
                  </label>
                  <div className="flex items-center bg-white border border-slate-200 px-3 py-2 rounded-md">
                    <span className="font-bold text-slate-900 mr-1">₹</span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="14990"
                      className="bg-transparent font-bold text-slate-900 outline-none w-full font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block uppercase font-bold tracking-wider text-slate-700">
                      Making Cost (INR ₹)
                    </label>
                    <span className="text-[9px] bg-slate-200 text-slate-700 px-1 rounded font-mono font-bold">
                      INTERNAL ONLY
                    </span>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 px-3 py-2 rounded-md">
                    <span className="font-bold text-slate-600 mr-1">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={newCostPrice}
                      onChange={(e) => setNewCostPrice(e.target.value)}
                      placeholder="6200"
                      className="bg-transparent font-bold text-slate-700 outline-none w-full font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Live Margin Calculation Preview */}
              {sellingNum > 0 && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-md flex items-center justify-between text-xs font-sans">
                  <div>
                    <span className="text-emerald-900 font-bold block">Estimated Unit Profit:</span>
                    <span className="text-slate-600 text-[11px]">
                      {costNum > 0 ? `Selling ₹${sellingNum} - Cost ₹${costNum}` : 'Enter making cost to refine'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-emerald-800 block">
                      +{formatINR(unitProfit)}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                      {marginPct}% Gross Margin
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <CustomSelect
                    value={newCategory}
                    onChange={setNewCategory}
                    options={[
                      { value: 'Signage', label: 'Signage' },
                      { value: 'Menu Displays', label: 'Menu Displays' },
                      { value: 'Counter Display Cases', label: 'Counter Display Cases' },
                      { value: 'Furniture', label: 'Furniture' },
                      { value: 'Tabletop Signs', label: 'Tabletop Signs' }
                    ]}
                    className="w-full"
                    buttonClassName="p-2.5 bg-slate-50 border-slate-200"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold tracking-wider text-slate-700 mb-1">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter architectural materials and dimensions description..."
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none resize-none focus:border-slate-400"
                />
              </div>

              {/* Upload Product Images */}
              <div>
                <label className="block uppercase font-bold tracking-wider text-slate-700 mb-1">
                  Product Photos
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-16 rounded-md border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={newImages[0]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="flex-1 border border-dashed border-slate-300 hover:border-[#1E3A2B] bg-slate-50 hover:bg-emerald-50/20 rounded-md p-3 text-center cursor-pointer transition-colors flex items-center justify-center space-x-2">
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-semibold text-slate-700">Choose Image File from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const urls: string[] = [];
                          Array.from(e.target.files).forEach((file) => {
                            if (file.type.startsWith('image/')) {
                              urls.push(URL.createObjectURL(file));
                            }
                          });
                          if (urls.length > 0) {
                            setNewImages(urls);
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E3A2B] text-white font-bold text-xs rounded-md hover:bg-[#14261d]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
