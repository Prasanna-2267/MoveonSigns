import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  X,
  Copy,
  Tag,
  CheckCircle2,
  TrendingUp,
  Truck,
  Search,
  Zap,
  CopyCheck
} from 'lucide-react';
import { INITIAL_DISCOUNTS } from '../../data/adminMockData';
import type { AdminDiscount } from '../../data/adminMockData';

export const AdminDiscounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(INITIAL_DISCOUNTS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'code' | 'automatic' | 'free_shipping' | 'bulk_tier'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<AdminDiscount | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Coupon Form State (Matching Sample UI)
  const [newCode, setNewCode] = useState('SAVE20');
  const [newValue, setNewValue] = useState<number>(20);
  const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');
  const [newAppliesToCategory, setNewAppliesToCategory] = useState<'everything' | 'collections'>('everything');
  const [newSelectedCollection, setNewSelectedCollection] = useState('Signage');
  const [newMaxUsesType, setNewMaxUsesType] = useState<'unlimited' | 'limited'>('unlimited');
  const [newLimit, setNewLimit] = useState(100);
  const [newExpiryType, setNewExpiryType] = useState<'no_expiry' | 'choose_date'>('no_expiry');
  const [newExpiry, setNewExpiry] = useState('2026-12-31');
  const [newIsEnabled, setNewIsEnabled] = useState(true);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    showToast(`Coupon code "${code}" copied to clipboard!`);
  };

  const generateRandomCode = () => {
    const prefixes = ['SAVE', 'FESTIVE', 'STUDIO', 'ARCH', 'DESIGN', 'MOVEON'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(10 + Math.random() * 90);
    setNewCode(`${randomPrefix}${randomNum}`);
  };

  const handleAddDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = newCode.trim().toUpperCase().replace(/\s+/g, '') || `SAVE${Math.floor(Math.random() * 90 + 10)}`;

    const newDisc: AdminDiscount = {
      id: `disc-${Date.now()}`,
      code: finalCode,
      title: `${newType === 'percentage' ? `${newValue}% OFF` : `₹${newValue} OFF`} ${
        newAppliesToCategory === 'everything'
          ? 'Entire Store'
          : newAppliesToCategory === 'collections'
          ? `${newSelectedCollection} Collection`
          : 'Selected Products'
      }`,
      type: newType,
      triggerType: 'code',
      value: Number(newValue),
      minOrderValue: 0,
      usageCount: 0,
      usageLimit: newMaxUsesType === 'limited' ? Number(newLimit) : 999999,
      startDate: new Date().toISOString().split('T')[0],
      endDate: newExpiryType === 'choose_date' ? newExpiry : 'No Expiry',
      status: newIsEnabled ? 'Active' : 'Disabled',
      appliesTo: newAppliesToCategory === 'everything' ? 'all' : (newSelectedCollection as any),
      customerEligibility: 'all',
      revenueGenerated: 0
    };

    setDiscounts([newDisc, ...discounts]);
    setIsAddModalOpen(false);
    resetForm();
    showToast(`Coupon "${newDisc.code}" created and activated!`);
  };

  const resetForm = () => {
    setNewCode('SAVE20');
    setNewValue(20);
    setNewType('percentage');
    setNewAppliesToCategory('everything');
    setNewSelectedCollection('Signage');
    setNewMaxUsesType('unlimited');
    setNewLimit(100);
    setNewExpiryType('no_expiry');
    setNewIsEnabled(true);
  };

  const handleToggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDiscounts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === 'Active' ? 'Disabled' : 'Active' } : d
      )
    );
    if (selectedDiscount && selectedDiscount.id === id) {
      setSelectedDiscount((prev) =>
        prev ? { ...prev, status: prev.status === 'Active' ? 'Disabled' : 'Active' } : null
      );
    }
    showToast('Promotion status toggled!');
  };

  const handleDuplicate = (disc: AdminDiscount, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicated: AdminDiscount = {
      ...disc,
      id: `disc-${Date.now()}`,
      code: `${disc.code}-COPY`,
      title: `${disc.title || disc.code} (Copy)`,
      usageCount: 0,
      status: 'Active'
    };
    setDiscounts([duplicated, ...discounts]);
    showToast(`Cloned coupon "${duplicated.code}" created!`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to archive this promotion?')) {
      setDiscounts(discounts.filter((d) => d.id !== id));
      if (selectedDiscount?.id === id) setSelectedDiscount(null);
      showToast('Promotion removed.');
    }
  };

  const filtered = discounts.filter((d) => {
    const matchSearch =
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      (d.title && d.title.toLowerCase().includes(search.toLowerCase()));

    const matchType =
      typeFilter === 'all'
        ? true
        : typeFilter === 'automatic'
        ? d.triggerType === 'automatic'
        : typeFilter === 'code'
        ? d.triggerType === 'code'
        : d.type === typeFilter;

    return matchSearch && matchType;
  });

  const totalRedemptions = discounts.reduce((acc, d) => acc + d.usageCount, 0);
  const activeCount = discounts.filter((d) => d.status === 'Active').length;
  const totalRevenueDriven = discounts.reduce((acc, d) => acc + (d.revenueGenerated || 0), 0);

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2B] text-white px-5 py-3 rounded-md shadow-xl flex items-center space-x-2 text-xs font-semibold animate-fade-in border border-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Discounts &amp; Promotional Engine</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Promo Codes, Automatic Cart Rules, VIP Commercial Tiers &amp; Free Shipping
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            generateRandomCode();
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promotion</span>
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            PROMOTIONAL REVENUE DRIVEN
          </span>
          <div className="text-2xl font-bold font-sans text-slate-900">
            {formatINR(totalRevenueDriven)}
          </div>
          <p className="text-[11px] text-emerald-600 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> 38% of total store sales
          </p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            ACTIVE PROMOTIONS
          </span>
          <div className="text-2xl font-bold font-sans text-slate-900">{activeCount} active</div>
          <p className="text-[11px] text-slate-500">{discounts.length} total campaigns</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            TOTAL COUPON REDEMPTIONS
          </span>
          <div className="text-2xl font-bold font-sans text-emerald-700">{totalRedemptions} uses</div>
          <p className="text-[11px] text-slate-500">Across Indian metro checkouts</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
            TOP CONVERTING TIER
          </span>
          <div className="text-xl font-bold font-mono text-[#1E3A2B]">FIRSTMOVE10</div>
          <p className="text-[11px] text-slate-500">142 new customer conversions</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xs space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {(
            [
              { id: 'all', label: 'All Promotions' },
              { id: 'code', label: 'Promo Codes' },
              { id: 'automatic', label: 'Automatic Cart Rules' },
              { id: 'free_shipping', label: 'Free Freight Promos' },
              { id: 'bulk_tier', label: 'Volume Tiers' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id as any)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all ${
                typeFilter === tab.id
                  ? 'bg-[#1E3A2B] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label} (
              {tab.id === 'all'
                ? discounts.length
                : tab.id === 'automatic'
                ? discounts.filter((d) => d.triggerType === 'automatic').length
                : tab.id === 'code'
                ? discounts.filter((d) => d.triggerType === 'code').length
                : discounts.filter((d) => d.type === tab.id).length}
              )
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code, promotion title, target rule..."
              className="bg-transparent text-xs text-slate-800 outline-none w-full"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:block">
            Tip: Click any row to view full redemption analytics
          </span>
        </div>
      </div>

      {/* Main Promotions Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Promotion / Code</th>
                <th className="py-3.5 px-4">Discount Type &amp; Value</th>
                <th className="py-3.5 px-4">Target / Eligibility</th>
                <th className="py-3.5 px-4">Min. Subtotal</th>
                <th className="py-3.5 px-4">Redemptions</th>
                <th className="py-3.5 px-4">Revenue Driven</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((disc) => (
                <tr
                  key={disc.id}
                  onClick={() => setSelectedDiscount(disc)}
                  className="hover:bg-slate-50/90 cursor-pointer transition-colors group"
                >
                  {/* Code & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center font-bold ${
                          disc.triggerType === 'automatic'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-[#1E3A2B] border border-emerald-200'
                        }`}
                      >
                        {disc.triggerType === 'automatic' ? (
                          <Zap className="w-4 h-4" />
                        ) : disc.type === 'free_shipping' ? (
                          <Truck className="w-4 h-4" />
                        ) : (
                          <Tag className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono font-bold text-sm text-slate-900 group-hover:text-[#1E3A2B] transition-colors">
                            {disc.code}
                          </span>
                          {disc.triggerType === 'code' && (
                            <button
                              onClick={(e) => handleCopy(disc.code, e)}
                              className="text-slate-400 hover:text-slate-900 p-0.5"
                              title="Copy Code"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        {disc.title && (
                          <p className="text-[11px] text-slate-500 font-sans truncate max-w-xs">
                            {disc.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-sm text-slate-900 block">
                      {disc.type === 'percentage'
                        ? `${disc.value}% OFF`
                        : disc.type === 'free_shipping'
                        ? 'FREE EXPRESS SHIPPING'
                        : disc.type === 'bulk_tier'
                        ? `₹${new Intl.NumberFormat('en-IN').format(disc.value)} TIER DEDUCTION`
                        : `₹${new Intl.NumberFormat('en-IN').format(disc.value)} FLAT OFF`}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">
                      {disc.triggerType === 'automatic' ? 'Auto-applied in cart' : 'Code entered at checkout'}
                    </span>
                  </td>

                  {/* Eligibility */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800 block">
                      {disc.customerEligibility === 'vip_architects'
                        ? '★ Commercial VIPs'
                        : disc.customerEligibility === 'new_customers'
                        ? 'New Accounts'
                        : 'All Customers'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {disc.appliesTo === 'all' ? 'All Products' : disc.appliesTo}
                    </span>
                  </td>

                  {/* Min Subtotal */}
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {formatINR(disc.minOrderValue)}
                  </td>

                  {/* Redemptions Progress */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="font-bold text-slate-900">{disc.usageCount}</span>
                        <span className="text-slate-400">/ {disc.usageLimit} max</span>
                      </div>
                      <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#1E3A2B] h-full"
                          style={{
                            width: `${Math.min(100, (disc.usageCount / disc.usageLimit) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Revenue Driven */}
                  <td className="py-3.5 px-4 font-bold font-sans text-sm text-slate-900">
                    {formatINR(disc.revenueGenerated || disc.usageCount * 5500)}
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleToggleStatus(disc.id, e)}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md border transition-all ${
                        disc.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : disc.status === 'Expired'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {disc.status === 'Active' ? '● Active' : disc.status === 'Expired' ? '○ Expired' : '○ Disabled'}
                    </button>
                  </td>

                  {/* Actions (Clone / Delete) */}
                  <td className="py-3.5 px-4 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleDuplicate(disc, e)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors inline-block"
                      title="Clone / Duplicate Promotion"
                    >
                      <CopyCheck className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(disc.id, e)}
                      className="p-1.5 text-slate-400 hover:text-[#C71910] hover:bg-red-50 rounded-md transition-colors inline-block"
                      title="Delete promotion"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotion Details / Analytics Modal */}
      {selectedDiscount && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-[#1E3A2B] text-white rounded-lg flex items-center justify-center font-bold text-base shadow-xs">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-mono text-2xl font-bold text-slate-900">
                      {selectedDiscount.code}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
                        selectedDiscount.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {selectedDiscount.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedDiscount.title || 'Architectural Signage Promotion'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDiscount(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Campaign Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 border border-slate-200 rounded-lg text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  GROSS REVENUE DRIVEN
                </span>
                <span className="text-lg font-bold font-sans text-slate-900 block mt-0.5">
                  {formatINR(selectedDiscount.revenueGenerated || selectedDiscount.usageCount * 5500)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  REDEMPTIONS
                </span>
                <span className="text-lg font-bold font-mono text-emerald-800 block mt-0.5">
                  {selectedDiscount.usageCount} / {selectedDiscount.usageLimit} uses
                </span>
              </div>
            </div>

            {/* Configured Rules */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-serif text-base font-bold text-slate-900">Promotion Rules</h4>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Benefit:</span>
                  <span className="font-bold text-slate-900">
                    {selectedDiscount.type === 'percentage'
                      ? `${selectedDiscount.value}% OFF Cart Subtotal`
                      : selectedDiscount.type === 'free_shipping'
                      ? 'Free Express Air Freight'
                      : `₹${selectedDiscount.value} Flat Deduction`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Minimum Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatINR(selectedDiscount.minOrderValue)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Eligible Segment:</span>
                  <span className="font-medium text-slate-800">
                    {selectedDiscount.customerEligibility === 'vip_architects'
                      ? 'Verified Architects & Commercial Accounts'
                      : selectedDiscount.customerEligibility === 'new_customers'
                      ? 'First-Time Customers'
                      : 'All Storefront Visitors'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Applies To:</span>
                  <span className="font-medium text-slate-800">
                    {selectedDiscount.appliesTo === 'all'
                      ? 'Entire Moveon Signs Catalog'
                      : `${selectedDiscount.appliesTo} Collection`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Campaign Validity:</span>
                  <span className="font-mono text-slate-800">
                    {selectedDiscount.startDate} to {selectedDiscount.endDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={(e) => handleCopy(selectedDiscount.code, e)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </button>

              <button
                onClick={(e) => handleToggleStatus(selectedDiscount.id, e)}
                className={`px-4 py-2 text-white rounded-md text-xs font-bold transition-colors ${
                  selectedDiscount.status === 'Active'
                    ? 'bg-slate-800 hover:bg-slate-900'
                    : 'bg-[#1E3A2B] hover:bg-[#14261d]'
                }`}
              >
                {selectedDiscount.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Coupon Modal (Designed directly from UI Specification) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200/80 shadow-2xl rounded-2xl max-w-2xl w-full p-7 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start pb-1">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">New coupon</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Create a controlled discount for the Move On Signs Store.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDiscount} className="space-y-4 text-xs font-sans">
              {/* Row 1: Code & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Coupon code
                    </label>
                    <button
                      type="button"
                      onClick={generateRandomCode}
                      className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-0.5"
                      title="Generate random promo code"
                    >
                      <span>🎲 Randomize</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                      placeholder="e.g. SAVE20"
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-xl font-mono uppercase font-bold text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Discount value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      value={newValue || ''}
                      onChange={(e) => setNewValue(Number(e.target.value))}
                      placeholder={newType === 'percentage' ? 'e.g. 20' : 'e.g. 500'}
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-xl font-bold text-sm text-slate-900 outline-none transition-all pr-8"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                      {newType === 'percentage' ? '%' : '₹'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Discount type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Discount type
                </label>
                <div className="bg-slate-100/90 p-1 rounded-xl flex border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setNewType('percentage')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                      newType === 'percentage'
                        ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Percentage
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('fixed')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                      newType === 'fixed'
                        ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Flat amount
                  </button>
                </div>
              </div>

              {/* Row 3: Applies to */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Applies to
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewAppliesToCategory('everything')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      newAppliesToCategory === 'everything'
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 text-blue-900'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <p className="font-bold text-xs">Everything</p>
                    <p className="text-[11px] text-slate-500 mt-1">Every eligible Store resource</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewAppliesToCategory('collections')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      newAppliesToCategory === 'collections'
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 text-blue-900'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <p className="font-bold text-xs">Selected packages</p>
                    <p className="text-[11px] text-slate-500 mt-1">One or more signage collections</p>
                  </button>
                </div>

                {newAppliesToCategory === 'collections' && (
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-slate-700">Choose Collection Scope:</span>
                    <div className="flex flex-wrap gap-2">
                      {['Signage', 'Menu Displays', 'Counter Display Cases', 'Furniture', 'Tabletop Signs'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewSelectedCollection(cat)}
                          className={`px-3 py-1 text-xs rounded-lg border font-medium transition-all ${
                            newSelectedCollection === cat
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-semibold'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Maximum uses & Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Maximum uses */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Maximum uses
                  </label>
                  <div className="bg-slate-100/90 p-1 rounded-xl flex border border-slate-200/60 mb-2">
                    <button
                      type="button"
                      onClick={() => setNewMaxUsesType('unlimited')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        newMaxUsesType === 'unlimited'
                          ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Unlimited
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewMaxUsesType('limited')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        newMaxUsesType === 'limited'
                          ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Limited
                    </button>
                  </div>
                  {newMaxUsesType === 'limited' && (
                    <input
                      type="number"
                      min="1"
                      value={newLimit}
                      onChange={(e) => setNewLimit(Number(e.target.value))}
                      placeholder="e.g. 100 uses max"
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-xl text-xs font-mono font-semibold text-slate-900 outline-none"
                    />
                  )}
                </div>

                {/* Expiry */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Expiry
                  </label>
                  <div className="bg-slate-100/90 p-1 rounded-xl flex border border-slate-200/60 mb-2">
                    <button
                      type="button"
                      onClick={() => setNewExpiryType('no_expiry')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        newExpiryType === 'no_expiry'
                          ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      No expiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewExpiryType('choose_date')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        newExpiryType === 'choose_date'
                          ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Choose date
                    </button>
                  </div>
                  {newExpiryType === 'choose_date' && (
                    <input
                      type="date"
                      value={newExpiry}
                      onChange={(e) => setNewExpiry(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-xl text-xs font-mono font-semibold text-slate-900 outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Row 5: Enable coupon */}
              <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Enable coupon</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Customers can redeem it immediately when all other rules allow.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsEnabled}
                    onChange={(e) => setNewIsEnabled(e.target.checked)}
                    className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
                  />
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all"
                >
                  Create coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
