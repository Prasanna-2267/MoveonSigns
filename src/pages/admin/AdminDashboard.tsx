import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ArrowUpRight,
  Calendar,
  Eye,
  Clock
} from 'lucide-react';
import { INITIAL_ORDERS } from '../../data/adminMockData';
import { PRODUCTS } from '../../data/products';

export const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'ytd'>('30d');

  const totalRevenue = dateRange === 'today' ? 63470 : dateRange === '7d' ? 489200 : 1482500;
  const totalCogsExpense = Math.round(totalRevenue * 0.417); // Making cost / production expense
  const netGrossProfit = totalRevenue - totalCogsExpense;
  const netMarginPct = ((netGrossProfit / totalRevenue) * 100).toFixed(1);

  const todayRevenue = 63470;
  const totalOrders = dateRange === 'today' ? 5 : dateRange === '7d' ? 42 : 128;
  const totalCustomers = 342;
  const lowStockCount = 3;
  const abandonedCartValue = 71960;

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  return (
    <div className="space-y-8 text-slate-900 font-sans">
      {/* Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Executive Dashboard</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Store Performance &amp; Live Operations Overview
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100 p-1 border border-slate-200 rounded-md">
          <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          {(['today', '7d', '30d', 'ytd'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                dateRange === range
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'YTD'}
            </button>
          ))}
        </div>
      </div>

      {/* Executive Financial & Profit Summary Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900">
              Financial Health &amp; Profit Realization
            </h2>
            <p className="text-xs text-slate-500">
              Calculated from retail sales minus internal manufacturing making costs
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 font-bold rounded w-fit">
            +{netMarginPct}% NET STORE PROFIT MARGIN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
              1. GROSS REVENUE
            </span>
            <div className="text-2xl font-bold font-sans text-slate-900">
              {formatINR(totalRevenue)}
            </div>
            <p className="text-[11px] text-slate-500">Total customer checkout value</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                2. NET EXPENSES (MAKING COST)
              </span>
              <span className="text-[9px] bg-slate-200 text-slate-700 px-1 font-bold rounded">
                COGS
              </span>
            </div>
            <div className="text-2xl font-bold font-sans text-slate-700">
              {formatINR(totalCogsExpense)}
            </div>
            <p className="text-[11px] text-slate-500">Materials, fabrication &amp; packaging</p>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-700 font-mono block">
              3. NET GROSS PROFIT
            </span>
            <div className="text-2xl font-bold font-sans text-emerald-900">
              +{formatINR(netGrossProfit)}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> Realized gross profit after costs
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
            TOTAL REVENUE
          </span>
          <div className="text-xl font-bold font-sans text-slate-900">
            {formatINR(totalRevenue)}
          </div>
          <div className="flex items-center text-[11px] font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span>+18.4% this month</span>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
            TODAY'S REVENUE
          </span>
          <div className="text-xl font-bold font-sans text-slate-900">
            {formatINR(todayRevenue)}
          </div>
          <div className="flex items-center text-[11px] font-semibold text-slate-500">
            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>5 orders placed</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
            TOTAL ORDERS
          </span>
          <div className="text-xl font-bold font-sans text-slate-900">{totalOrders}</div>
          <div className="flex items-center text-[11px] font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span>3.8% conversion</span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
            CUSTOMERS
          </span>
          <div className="text-xl font-bold font-sans text-slate-900">{totalCustomers}</div>
          <div className="flex items-center text-[11px] font-semibold text-slate-500">
            <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>+24 new this week</span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C71910] block">
            LOW STOCK ALERTS
          </span>
          <div className="text-xl font-bold font-sans text-[#C71910]">{lowStockCount}</div>
          <Link
            to="/admin/inventory"
            className="text-[11px] text-[#C71910] font-semibold underline block hover:opacity-80"
          >
            Review inventory →
          </Link>
        </div>

        {/* Abandoned Cart Value */}
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
            ABANDONED CARTS
          </span>
          <div className="text-xl font-bold font-sans text-slate-900">
            {formatINR(abandonedCartValue)}
          </div>
          <Link
            to="/admin/abandoned-carts"
            className="text-[11px] text-slate-700 font-semibold underline block hover:opacity-80"
          >
            Send recovery →
          </Link>
        </div>
      </div>

      {/* Revenue Performance Chart Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-serif text-xl text-slate-900 font-bold">Revenue Velocity</h2>
              <p className="text-xs text-slate-500">Daily sales breakdown by category (INR)</p>
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

          {/* Graphical Bars */}
          <div className="h-48 flex items-end justify-between space-x-2 pt-6">
            {[
              { day: 'Mon', sign: 40, case: 60, val: '₹48k' },
              { day: 'Tue', sign: 55, case: 45, val: '₹62k' },
              { day: 'Wed', sign: 70, case: 80, val: '₹95k' },
              { day: 'Thu', sign: 50, case: 75, val: '₹74k' },
              { day: 'Fri', sign: 85, case: 90, val: '₹1.2L' },
              { day: 'Sat', sign: 95, case: 100, val: '₹1.5L' },
              { day: 'Sun', sign: 60, case: 70, val: '₹88k' }
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.val}
                </span>
                <div className="w-full flex items-end space-x-1 justify-center h-32">
                  <div
                    className="w-3.5 bg-[#1E3A2B] rounded-t-xs transition-all group-hover:opacity-90"
                    style={{ height: `${d.sign}%` }}
                  />
                  <div
                    className="w-3.5 bg-[#C71910] rounded-t-xs transition-all group-hover:opacity-90"
                    style={{ height: `${d.case}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600 uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Products (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
          <h2 className="font-serif text-xl text-slate-900 font-bold border-b border-slate-100 pb-3">
            Top Performing Items
          </h2>
          <div className="space-y-4">
            {PRODUCTS.slice(0, 4).map((prod) => (
              <div key={prod.id} className="flex items-center space-x-3">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-12 h-14 object-cover rounded-md border border-slate-200 bg-slate-50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                  <p className="text-[11px] text-slate-500">{formatINR(prod.price)}</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {prod.reviewCount || 34} sold
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-serif text-xl text-slate-900 font-bold">Recent Orders</h2>
            <p className="text-xs text-slate-500">Latest transactions requiring fulfillment</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs uppercase tracking-wider font-bold text-[#1E3A2B] hover:underline"
          >
            VIEW ALL ORDERS →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3 px-3">Order</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Total</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Fulfillment</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">{order.date}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-medium text-slate-900">{order.customerName}</p>
                    <p className="text-[10px] text-slate-400">{order.customerCity}</p>
                  </td>
                  <td className="py-3.5 px-3 font-bold font-sans text-slate-900">
                    {formatINR(order.total)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
                        order.fulfillmentStatus === 'Completed'
                          ? 'bg-[#1E3A2B] text-white'
                          : order.fulfillmentStatus === 'Shipped'
                          ? 'bg-slate-100 text-slate-800 border border-slate-300'
                          : 'bg-red-50 text-[#C71910] border border-red-200'
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      to="/admin/orders"
                      className="p-1 text-slate-500 hover:text-slate-900 inline-block"
                      title="View order"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
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
