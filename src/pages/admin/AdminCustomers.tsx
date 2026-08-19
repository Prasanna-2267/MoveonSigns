import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send
} from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../../data/adminMockData';
import type { AdminCustomer } from '../../data/adminMockData';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'New' | 'Returning' | 'High Value'>('All');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteCity, setInviteCity] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search));
    const matchType = filterType === 'All' || c.customerType === filterType;
    return matchSearch && matchType;
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newCust: AdminCustomer = {
      id: `cust-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      phone: '+91 98765 43210',
      city: inviteCity || 'Bengaluru',
      state: 'Karnataka',
      ordersCount: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      customerType: 'New',
      lastOrderDate: new Date().toISOString().split('T')[0]
    };

    setCustomers([newCust, ...customers]);
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteCity('');
    showToast(`Commercial invite sent to ${inviteEmail}!`);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2B] text-white px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center space-x-2 animate-fade-in border border-emerald-700">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Customer Directory</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Accounts, Lifetime Spend &amp; Commercial Purchasing Profiles
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-xs transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Customer</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xs space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {(['All', 'New', 'Returning', 'High Value'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all ${
                filterType === tab
                  ? 'bg-[#1E3A2B] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab} Customers ({tab === 'All' ? customers.length : customers.filter((c) => c.customerType === tab).length})
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
              placeholder="Search customer name, email, phone, city..."
              className="bg-transparent text-xs text-slate-800 outline-none w-full"
            />
          </div>
          <p className="text-xs text-slate-400 font-mono hidden sm:block">
            Tip: Click any customer row to view full profile &amp; order history
          </p>
        </div>
      </div>

      {/* Customers Table — Direct Click to Open */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Orders Count</th>
                <th className="py-3.5 px-4">Total Spent (INR)</th>
                <th className="py-3.5 px-4">Average Order Value</th>
                <th className="py-3.5 px-4">Segment</th>
                <th className="py-3.5 px-4 text-right">View Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-slate-50/90 cursor-pointer transition-colors group"
                >
                  {/* Customer Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#1E3A2B] group-hover:text-white text-slate-700 flex items-center justify-center font-bold text-xs transition-colors shadow-2xs">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 group-hover:text-[#1E3A2B] group-hover:underline transition-colors">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{cust.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 text-slate-700">
                    <p className="font-medium text-slate-900">{cust.city}</p>
                    <p className="text-[10px] text-slate-400">{cust.state}</p>
                  </td>

                  {/* Orders */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {cust.ordersCount} orders
                  </td>

                  {/* Total Spent */}
                  <td className="py-3.5 px-4 font-bold font-sans text-sm text-slate-900">
                    {formatINR(cust.totalSpent)}
                  </td>

                  {/* AOV */}
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {formatINR(cust.averageOrderValue)}
                  </td>

                  {/* Segment Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
                        cust.customerType === 'High Value'
                          ? 'bg-red-50 text-[#C71910] border border-red-200'
                          : cust.customerType === 'Returning'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {cust.customerType}
                    </span>
                  </td>

                  {/* Arrow Indicator (Replaces eye icon) */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal (Opened directly on row click) */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-lg font-bold shadow-xs">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 leading-tight">
                      {selectedCustomer.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm ${
                        selectedCustomer.customerType === 'High Value'
                          ? 'bg-red-50 text-[#C71910] border border-red-200'
                          : selectedCustomer.customerType === 'Returning'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {selectedCustomer.customerType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Customer ID: {selectedCustomer.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lifetime Metrics */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 border border-slate-200 rounded-lg text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                  LIFETIME SPEND
                </span>
                <span className="text-lg font-bold font-sans text-slate-900 block mt-1">
                  {formatINR(selectedCustomer.totalSpent)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                  TOTAL ORDERS
                </span>
                <span className="text-lg font-bold font-sans text-slate-900 block mt-1">
                  {selectedCustomer.ordersCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                  AVG ORDER VALUE
                </span>
                <span className="text-lg font-bold font-sans text-slate-900 block mt-1">
                  {formatINR(selectedCustomer.averageOrderValue)}
                </span>
              </div>
            </div>

            {/* Contact & Shipping Details */}
            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Contact &amp; Shipping Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${selectedCustomer.email}`}
                      className="font-semibold text-slate-900 hover:text-[#1E3A2B] hover:underline"
                    >
                      {selectedCustomer.email}
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Phone Number
                    </span>
                    <span className="font-semibold font-mono text-slate-900">
                      {selectedCustomer.phone || '+91 98765 43210'}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Primary Delivery Address
                    </span>
                    <p className="font-medium text-slate-800 leading-relaxed">
                      {selectedCustomer.city}, {selectedCustomer.state}, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Commercial Notes &amp; Preferences
              </h4>
              <textarea
                rows={2}
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="Add internal notes about this cafe / architect client..."
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none resize-none focus:border-slate-400 focus:bg-white"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Customer note saved to Moveon Signs CRM!')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-bold"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <a
                href={`mailto:${selectedCustomer.email}?subject=Moveon%20Signs%20-%20Order%20Update`}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-md flex items-center space-x-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Email</span>
              </a>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs rounded-md transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Customer Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-md w-full p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Invite Commercial Client
              </h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase mb-1 text-slate-700">Client / Contact Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Anand Mahindra"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1 text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. anand@studioarch.in"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1 text-slate-700">City / Location</label>
                <input
                  type="text"
                  value={inviteCity}
                  onChange={(e) => setInviteCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs rounded-md shadow-xs transition-colors"
                >
                  Send Account Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
