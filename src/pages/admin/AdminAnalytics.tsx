import React, { useState } from 'react';
import {
  ArrowUpRight,
  MapPin,
  Download
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | 'ytd'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'cities' | 'funnel'>('overview');

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  const totalRevenue = timeRange === 'today' ? 63470 : timeRange === '7d' ? 489200 : 1482500;
  const totalOrders = timeRange === 'today' ? 5 : timeRange === '7d' ? 42 : 128;
  const totalSessions = timeRange === 'today' ? 840 : timeRange === '7d' ? 5420 : 18450;
  const aov = Math.round(totalRevenue / totalOrders);

  const citySales = [
    { city: 'Mumbai & MMR', state: 'Maharashtra', revenue: 495000, orders: 42, pct: 33 },
    { city: 'Bengaluru', state: 'Karnataka', revenue: 385000, orders: 34, pct: 26 },
    { city: 'Delhi NCR', state: 'Delhi / Haryana', revenue: 290000, orders: 25, pct: 20 },
    { city: 'Hyderabad', state: 'Telangana', revenue: 148000, orders: 13, pct: 10 },
    { city: 'Chennai', state: 'Tamil Nadu', revenue: 98000, orders: 8, pct: 7 },
    { city: 'Pune & Goa', state: 'West Zone', revenue: 66500, orders: 6, pct: 4 }
  ];

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Analytics &amp; Business Intelligence</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Revenue Velocity, Metro City Breakdown &amp; Conversion Funnels
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-md">
            {(['today', '7d', '30d', 'ytd'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                  timeRange === r
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === 'today' ? 'Today' : r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : 'YTD'}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Analytics executive report exported.')}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-md text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon with Profit & COGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">GROSS SALES</span>
          <div className="text-2xl font-bold font-sans text-slate-900">{formatINR(totalRevenue)}</div>
          <p className="text-[11px] text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> +18.4% growth
          </p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">NET EXPENSES (COGS)</span>
          <div className="text-2xl font-bold font-sans text-slate-700">{formatINR(Math.round(totalRevenue * 0.417))}</div>
          <p className="text-[11px] text-slate-500">Materials &amp; fabrication</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-700 font-mono">NET REALIZED PROFIT</span>
          <div className="text-2xl font-bold font-sans text-emerald-900">+{formatINR(Math.round(totalRevenue * 0.583))}</div>
          <p className="text-[11px] text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> 58.3% net margin
          </p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">TOTAL ORDERS</span>
          <div className="text-2xl font-bold font-sans text-slate-900">{totalOrders}</div>
          <p className="text-[11px] text-slate-500">{formatINR(aov)} AOV</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">STORE SESSIONS</span>
          <div className="text-2xl font-bold font-sans text-slate-900">{totalSessions.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Across Indian metros</p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-md w-fit">
        {(['overview', 'products', 'cities', 'funnel'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab === 'overview'
              ? 'Revenue Velocity'
              : tab === 'products'
              ? 'Product Performance'
              : tab === 'cities'
              ? 'Pan-India Geo Sales'
              : 'Conversion Funnel'}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Body */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Bars (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h2 className="font-serif text-xl text-slate-900 font-bold">Daily Sales Trajectory</h2>
                <p className="text-xs text-slate-500">Breakdown by Signage vs Display Cases (INR)</p>
              </div>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-[#1E3A2B] rounded-full mr-1.5" />
                  Signage
                </span>
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-[#C71910] rounded-full mr-1.5" />
                  Display Cases
                </span>
              </div>
            </div>

            {/* Bars */}
            <div className="h-56 flex items-end justify-between space-x-3 pt-6">
              {[
                { day: 'Mon', sign: 45, case: 65, val: '₹62,000' },
                { day: 'Tue', sign: 55, case: 50, val: '₹75,000' },
                { day: 'Wed', sign: 75, case: 80, val: '₹1,10,000' },
                { day: 'Thu', sign: 60, case: 85, val: '₹98,000' },
                { day: 'Fri', sign: 90, case: 95, val: '₹1,45,000' },
                { day: 'Sat', sign: 100, case: 100, val: '₹1,85,000' },
                { day: 'Sun', sign: 70, case: 75, val: '₹95,000' }
              ].map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center space-y-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.val}
                  </span>
                  <div className="w-full flex items-end space-x-1 justify-center h-40">
                    <div
                      className="w-4 bg-[#1E3A2B] rounded-t transition-all group-hover:opacity-90"
                      style={{ height: `${d.sign}%` }}
                    />
                    <div
                      className="w-4 bg-[#C71910] rounded-t transition-all group-hover:opacity-90"
                      style={{ height: `${d.case}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 uppercase">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Share (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <h2 className="font-serif text-xl text-slate-900 font-bold border-b border-slate-100 pb-3">
              Sales by Category
            </h2>
            <div className="space-y-3 text-xs">
              {[
                { cat: 'Signage & A-Frames', rev: '₹6,40,000', pct: 43 },
                { cat: 'Counter Display Cases', rev: '₹4,80,000', pct: 32 },
                { cat: 'Menu Boards', rev: '₹2,60,000', pct: 18 },
                { cat: 'Cafe Furniture', rev: '₹1,02,500', pct: 7 }
              ].map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-800">{c.cat}</span>
                    <span className="text-slate-900">{c.rev}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1E3A2B] h-full rounded-full"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{c.pct}% of total store volume</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">Product Profitability &amp; Velocity</h2>
              <p className="text-xs text-slate-500">Retail sales vs internal making costs &amp; realized profits</p>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 font-bold rounded">
              COGS TRACKING ACTIVE
            </span>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Units Sold</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4">Making Cost</th>
                <th className="py-3.5 px-4">Gross Revenue</th>
                <th className="py-3.5 px-4">Total Cost</th>
                <th className="py-3.5 px-4">Net Profit</th>
                <th className="py-3.5 px-4 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRODUCTS.map((p, idx) => {
                const sold = 38 - idx * 2;
                const costPerUnit = p.costPrice || Math.round(p.price * 0.45);
                const grossSales = p.price * sold;
                const totalCost = costPerUnit * sold;
                const netProfit = grossSales - totalCost;
                const margin = ((netProfit / grossSales) * 100).toFixed(1);

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-12 object-cover rounded border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{sold} units</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{formatINR(p.price)}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-600 bg-slate-50/50">
                      {formatINR(costPerUnit)}
                    </td>
                    <td className="py-3.5 px-4 font-bold font-sans text-slate-900">
                      {formatINR(grossSales)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {formatINR(totalCost)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-800 font-sans">
                      +{formatINR(netProfit)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        {margin}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'cities' && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-serif text-lg font-bold text-slate-900">Pan-India Geographic Distribution</h2>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Metro Region</th>
                <th className="py-3.5 px-4">State / Zone</th>
                <th className="py-3.5 px-4">Order Volume</th>
                <th className="py-3.5 px-4">Revenue Share</th>
                <th className="py-3.5 px-4 text-right">Total Sales (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {citySales.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>{c.city}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{c.state}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">{c.orders} orders</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1E3A2B] h-full" style={{ width: `${c.pct}%` }} />
                      </div>
                      <span className="font-mono text-[11px] text-slate-500">{c.pct}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold font-sans text-sm text-slate-900">
                    {formatINR(c.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'funnel' && (
        <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-6">
          <h2 className="font-serif text-xl text-slate-900 font-bold border-b border-slate-100 pb-3">
            E-Commerce Conversion Funnel
          </h2>
          <div className="space-y-4 text-xs font-sans max-w-2xl">
            {[
              { stage: '1. Store Visits & Product Pages Viewed', count: '18,450 sessions', pct: '100%' },
              { stage: '2. Added Items to Shopping Cart', count: '2,214 sessions', pct: '12.0%' },
              { stage: '3. Reached Secure Checkout', count: '1,107 sessions', pct: '6.0%' },
              { stage: '4. Successful Payment / Orders Completed', count: '705 orders', pct: '3.8%' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{item.stage}</span>
                  <span className="font-mono text-slate-900">{item.count} ({item.pct})</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3A2B] h-full rounded-full"
                    style={{ width: `${100 - idx * 24}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
