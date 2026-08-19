import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Search,
  AlertTriangle,
  Package,
  History,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CheckCircle2
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  variantName: string;
  sku: string;
  stock: number;
  threshold: number;
  category: string;
  image: string;
  price: number;
}

interface StockLog {
  id: string;
  sku: string;
  productName: string;
  change: number;
  previousStock: number;
  newStock: number;
  reason: string;
  date: string;
}

export const AdminInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() =>
    PRODUCTS.flatMap((p) =>
      p.variants.map((v) => ({
        id: v.id,
        productId: p.id,
        productName: p.name,
        variantName: v.name,
        sku: v.sku,
        stock: v.stock || 12,
        threshold: 5,
        category: p.category,
        image: p.images[0],
        price: v.price
      }))
    )
  );

  const [stockLogs, setStockLogs] = useState<StockLog[]>([
    {
      id: 'log-1',
      sku: 'BDCP-BLK-M',
      productName: 'Bakery Display Case Pro (Satin Black)',
      change: 10,
      previousStock: 2,
      newStock: 12,
      reason: 'Production Restock (+10 units)',
      date: 'Today, 2:45 PM'
    },
    {
      id: 'log-2',
      sku: 'SR-SGN-460',
      productName: 'Standing Round Sign (Matte Black)',
      change: -2,
      previousStock: 7,
      newStock: 5,
      reason: 'Order Fulfillment MOS-2026-8909',
      date: 'Yesterday, 11:30 AM'
    }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'low' | 'out'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick inline step adjust
  const handleQuickStep = (id: string, delta: number) => {
    const item = inventory.find((i) => i.id === id);
    if (!item) return;

    const newStock = Math.max(0, item.stock + delta);
    setInventory((prev) =>
      prev.map((i) => (i.id === id ? { ...i, stock: newStock } : i))
    );

    const log: StockLog = {
      id: `log-${Date.now()}`,
      sku: item.sku,
      productName: `${item.productName} (${item.variantName})`,
      change: delta,
      previousStock: item.stock,
      newStock: newStock,
      reason: delta > 0 ? `Stock Added (+${delta})` : `Stock Deducted (${delta})`,
      date: 'Just now'
    };
    setStockLogs([log, ...stockLogs]);
    showToast(`Updated ${item.sku}: ${item.stock} → ${newStock} units`);
  };

  // Direct manual stock quantity input
  const handleDirectStockChange = (id: string, value: number) => {
    const item = inventory.find((i) => i.id === id);
    if (!item) return;

    const newStock = Math.max(0, value);
    if (newStock === item.stock) return;

    const delta = newStock - item.stock;
    setInventory((prev) =>
      prev.map((i) => (i.id === id ? { ...i, stock: newStock } : i))
    );

    const log: StockLog = {
      id: `log-${Date.now()}`,
      sku: item.sku,
      productName: `${item.productName} (${item.variantName})`,
      change: delta,
      previousStock: item.stock,
      newStock: newStock,
      reason: delta > 0 ? `Manual Restock (+${delta})` : `Manual Count Adjustment (${delta})`,
      date: 'Just now'
    };
    setStockLogs([log, ...stockLogs]);
    showToast(`Saved ${item.sku}: ${newStock} units on hand`);
  };

  // Threshold update
  const handleUpdateThreshold = (id: string, newThreshold: number) => {
    setInventory((prev) =>
      prev.map((i) => (i.id === id ? { ...i, threshold: Math.max(1, newThreshold) } : i))
    );
  };

  const filtered = inventory
    .filter((item) => {
      const matchSearch =
        item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.variantName.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'low'
          ? item.stock <= item.threshold && item.stock > 0
          : item.stock === 0;

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      // Out-of-stock items (0 units on hand) are always moved to the very end
      const aOut = a.stock === 0 ? 1 : 0;
      const bOut = b.stock === 0 ? 1 : 0;
      if (aOut !== bOut) {
        return aOut - bOut;
      }
      // If both are in-stock or both out-of-stock, preserve alphabetical order
      return a.productName.localeCompare(b.productName);
    });

  const totalUnits = inventory.reduce((acc, i) => acc + i.stock, 0);
  const lowStockCount = inventory.filter((i) => i.stock <= i.threshold && i.stock > 0).length;
  const outOfStockCount = inventory.filter((i) => i.stock === 0).length;

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
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Inventory &amp; Stock Control</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Real-Time Stock Counts, Quick Inline Restock (+/-) &amp; Live Audit History
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => showToast('Inventory manifest exported to CSV.')}
            className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-md text-xs font-semibold transition-colors flex items-center space-x-2 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inventory KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              TOTAL STOCK ON HAND
            </span>
            <div className="text-2xl font-bold font-sans text-slate-900">{totalUnits} units</div>
            <p className="text-xs text-slate-500">{inventory.length} variant SKUs monitored</p>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              LOW STOCK ALERTS
            </span>
            <div className="text-2xl font-bold font-sans text-amber-600">{lowStockCount} items</div>
            <p className="text-xs text-slate-500">At or below reorder threshold</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#C71910] uppercase tracking-wider">
              OUT OF STOCK
            </span>
            <div className="text-2xl font-bold font-sans text-[#C71910]">{outOfStockCount} items</div>
            <p className="text-xs text-slate-500">Requires production replenishment</p>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-[#C71910]">
            <X className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU, product name, variant..."
              className="bg-transparent text-xs text-slate-800 outline-none w-full"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-md">
            {(['all', 'low', 'out'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? 'All Items' : st === 'low' ? 'Low Stock' : 'Out of Stock'}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono text-slate-500">
          Showing {filtered.length} of {inventory.length} SKUs
        </span>
      </div>

      {/* Main Layout: Inventory Table & Recent Stock Log */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Clean Inline Inventory Management Table (8 cols) */}
        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h2 className="font-serif text-lg font-bold text-slate-900">Active Stock Registry</h2>
            <span className="text-xs text-slate-500">
              Adjust stock inline via inputs or steppers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  <th className="py-3.5 px-4">Item / SKU</th>
                  <th className="py-3.5 px-4">Stock on Hand</th>
                  <th className="py-3.5 px-4">Min. Threshold</th>
                  <th className="py-3.5 px-4 text-right">Quick Stock Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const isLow = item.stock <= item.threshold && item.stock > 0;
                  const isOut = item.stock === 0;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Product & Variant */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-11 h-13 object-cover rounded-md border border-slate-200 bg-slate-50"
                          />
                          <div>
                            <p className="font-bold text-sm text-slate-900">{item.productName}</p>
                            <p className="text-xs text-slate-600 font-medium">{item.variantName}</p>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {item.sku}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Stock Quantity Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            value={item.stock}
                            onChange={(e) =>
                              handleDirectStockChange(item.id, Number(e.target.value))
                            }
                            className={`w-18 p-1.5 text-center font-bold text-sm rounded-md border outline-none font-mono ${
                              isOut
                                ? 'bg-red-50 border-red-300 text-[#C71910]'
                                : isLow
                                ? 'bg-amber-50 border-amber-300 text-amber-700'
                                : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400 focus:bg-white'
                            }`}
                          />
                          <span className="text-[11px] text-slate-400">units</span>
                        </div>
                        {isOut ? (
                          <span className="text-[9px] font-bold uppercase text-[#C71910] block mt-1">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="text-[9px] font-bold uppercase text-amber-600 block mt-1">
                            Low Stock Alert
                          </span>
                        ) : null}
                      </td>

                      {/* Threshold Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-1.5">
                          <input
                            type="number"
                            min="1"
                            value={item.threshold}
                            onChange={(e) =>
                              handleUpdateThreshold(item.id, Number(e.target.value))
                            }
                            className="w-14 bg-slate-50 border border-slate-200 p-1.5 text-center font-bold text-xs rounded-md outline-none focus:border-slate-400 focus:bg-white"
                          />
                          <span className="text-[10px] text-slate-400 font-mono">min</span>
                        </div>
                      </td>

                      {/* Quick Steppers: -1, +1, +5, +10 */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center space-x-1.5">
                          <button
                            onClick={() => handleQuickStep(item.id, -1)}
                            disabled={item.stock === 0}
                            className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 rounded-md text-slate-700 transition-colors shadow-2xs"
                            title="Deduct 1 unit"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleQuickStep(item.id, 1)}
                            className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-md text-slate-700 transition-colors shadow-2xs"
                            title="Add 1 unit"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleQuickStep(item.id, 5)}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-md border border-emerald-200 transition-colors shadow-2xs"
                            title="Restock +5 units"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => handleQuickStep(item.id, 10)}
                            className="px-2.5 py-1.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-[11px] rounded-md transition-colors shadow-2xs"
                            title="Restock +10 units"
                          >
                            +10
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

        {/* Right: Stock Audit & Adjustment History (4 cols) */}
        <div className="xl:col-span-4 bg-white border border-slate-200 rounded-lg shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-slate-500" />
              <h2 className="font-serif text-lg font-bold text-slate-900">Recent Stock Adjustments</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Live Log</span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {stockLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-500">{log.sku}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded flex items-center space-x-1 ${
                      log.change > 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {log.change > 0 ? (
                      <ArrowUpRight className="w-3 h-3 inline" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 inline" />
                    )}
                    <span>
                      {log.change > 0 ? `+${log.change}` : log.change} units
                    </span>
                  </span>
                </div>

                <p className="font-bold text-slate-800 truncate">{log.productName}</p>
                <p className="text-[11px] text-slate-500">{log.reason}</p>

                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-mono">
                  <span>
                    Stock: {log.previousStock} → {log.newStock}
                  </span>
                  <span>{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
