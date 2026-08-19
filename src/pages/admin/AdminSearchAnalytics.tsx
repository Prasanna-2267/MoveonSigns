import React from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { INITIAL_SEARCH_QUERIES } from '../../data/adminMockData';

export const AdminSearchAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Search &amp; Discovery Analytics</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Storefront Query Volume, Click-Through Rates &amp; Zero-Result Keywords
          </p>
        </div>

        <div className="bg-slate-50 px-4 py-2 border border-slate-200 rounded-md text-xs font-mono">
          <span className="text-slate-500">Total Queries (30 Days): </span>
          <span className="font-bold text-slate-900 text-sm">6,490</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500">
            SEARCH CLICK-THROUGH RATE
          </span>
          <div className="text-2xl font-bold font-sans text-slate-900">68.4%</div>
          <p className="text-[11px] text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> +3.2% vs previous month
          </p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500">
            ZERO-RESULT SEARCHES
          </span>
          <div className="text-2xl font-bold font-sans text-[#C71910]">4.2%</div>
          <p className="text-[11px] text-slate-500">e.g. "neon sign", "marquee"</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500">
            SEARCH-DRIVEN REVENUE
          </span>
          <div className="text-2xl font-bold font-sans text-slate-900">₹4,95,000</div>
          <p className="text-[11px] text-slate-500">33.4% of total store sales</p>
        </div>
      </div>

      {/* Top Search Queries Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="font-serif text-lg font-bold text-slate-900">Top Customer Search Queries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Search Term</th>
                <th className="py-3.5 px-4">Total Searches</th>
                <th className="py-3.5 px-4">Product Clicks</th>
                <th className="py-3.5 px-4">Orders Generated</th>
                <th className="py-3.5 px-4 text-right">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_SEARCH_QUERIES.map((sq, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-slate-900 flex items-center space-x-2">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sq.query}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{sq.searches}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{sq.clicks}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{sq.orders}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-sm text-slate-900">
                    {sq.conversionRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
