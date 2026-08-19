import React, { useState } from 'react';
import {
  Search,
  Download,
  X,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Printer,
  Copy,
  ChevronRight,
  Plus,
  AlertCircle
} from 'lucide-react';
import { INITIAL_ORDERS } from '../../data/adminMockData';
import type { AdminOrder } from '../../data/adminMockData';
import { CustomSelect } from '../../components/common/CustomSelect';

const COURIER_CARRIERS = [
  'Blue Dart Express',
  'Delhivery Air',
  'DTDC Express',
  'Ekart Logistics',
  'Xpressbees',
  'DHL Express Cargo',
  'FedEx India',
  'India Post Speed Post'
];

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Processing' | 'Shipped' | 'Completed'>('All');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Tracking modal / edit state
  const [editingTrackingOrderId, setEditingTrackingOrderId] = useState<string | null>(null);
  const [trackingCarrier, setTrackingCarrier] = useState('Blue Dart Express');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerCity.toLowerCase().includes(search.toLowerCase()) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'All' || o.fulfillmentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  // KPI Metrics
  const pendingCount = orders.filter((o) => o.fulfillmentStatus === 'Pending').length;
  const processingCount = orders.filter((o) => o.fulfillmentStatus === 'Processing').length;
  const shippedCount = orders.filter((o) => o.fulfillmentStatus === 'Shipped').length;
  const completedCount = orders.filter((o) => o.fulfillmentStatus === 'Completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Status update
  const handleUpdateStatus = (orderId: string, newStatus: AdminOrder['fulfillmentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, fulfillmentStatus: newStatus } : null));
    }
    showToast(`Order status updated to "${newStatus}"`);
  };

  // Tracking update
  const handleSaveTracking = (orderId: string) => {
    if (!trackingNumberInput.trim()) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              trackingNumber: `${trackingCarrier}: ${trackingNumberInput.trim()}`,
              fulfillmentStatus: o.fulfillmentStatus === 'Pending' || o.fulfillmentStatus === 'Processing' ? 'Shipped' : o.fulfillmentStatus
            }
          : o
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              trackingNumber: `${trackingCarrier}: ${trackingNumberInput.trim()}`,
              fulfillmentStatus:
                prev.fulfillmentStatus === 'Pending' || prev.fulfillmentStatus === 'Processing'
                  ? 'Shipped'
                  : prev.fulfillmentStatus
            }
          : null
      );
    }

    setEditingTrackingOrderId(null);
    setTrackingNumberInput('');
    showToast('Tracking AWB attached and order marked as Shipped!');
  };

  const handleCopy = (text: string, orderId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOrderId(orderId);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const showToast = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2B] text-white px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center space-x-2 animate-fade-in border border-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Order Management</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Fulfillment Pipeline, Courier AWB Tracking &amp; Invoices
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => showToast('Orders exported to CSV (INR format).')}
            className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-md text-xs font-semibold flex items-center space-x-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">TOTAL ORDERS</span>
          <div className="text-xl font-bold font-sans text-slate-900">{orders.length}</div>
          <span className="text-[11px] text-slate-500">{formatINR(totalRevenue)} total</span>
        </div>

        <div
          onClick={() => setStatusFilter('Pending')}
          className={`bg-white p-4 border rounded-lg shadow-xs space-y-1 cursor-pointer transition-all ${
            statusFilter === 'Pending' ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-amber-600 font-mono flex items-center">
            <Clock className="w-3 h-3 mr-1" /> PENDING
          </span>
          <div className="text-xl font-bold font-sans text-amber-700">{pendingCount}</div>
          <span className="text-[11px] text-slate-500">Needs fulfillment</span>
        </div>

        <div
          onClick={() => setStatusFilter('Processing')}
          className={`bg-white p-4 border rounded-lg shadow-xs space-y-1 cursor-pointer transition-all ${
            statusFilter === 'Processing' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-blue-600 font-mono flex items-center">
            <Package className="w-3 h-3 mr-1" /> IN PACKING
          </span>
          <div className="text-xl font-bold font-sans text-blue-700">{processingCount}</div>
          <span className="text-[11px] text-slate-500">Ready to dispatch</span>
        </div>

        <div
          onClick={() => setStatusFilter('Shipped')}
          className={`bg-white p-4 border rounded-lg shadow-xs space-y-1 cursor-pointer transition-all ${
            statusFilter === 'Shipped' ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-indigo-300'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-indigo-600 font-mono flex items-center">
            <Truck className="w-3 h-3 mr-1" /> IN TRANSIT
          </span>
          <div className="text-xl font-bold font-sans text-indigo-700">{shippedCount}</div>
          <span className="text-[11px] text-slate-500">With courier partner</span>
        </div>

        <div
          onClick={() => setStatusFilter('Completed')}
          className={`bg-white p-4 border rounded-lg shadow-xs space-y-1 cursor-pointer transition-all ${
            statusFilter === 'Completed' ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-emerald-300'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-emerald-600 font-mono flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> DELIVERED
          </span>
          <div className="text-xl font-bold font-sans text-emerald-700">{completedCount}</div>
          <span className="text-[11px] text-slate-500">Completed &amp; paid</span>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xs space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {(['All', 'Pending', 'Processing', 'Shipped', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all ${
                statusFilter === tab
                  ? 'bg-[#1E3A2B] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab} ({tab === 'All' ? orders.length : orders.filter((o) => o.fulfillmentStatus === tab).length})
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID, customer, city, or AWB tracking #..."
              className="bg-transparent text-xs text-slate-800 outline-none w-full"
            />
          </div>
          <p className="text-xs text-slate-400 font-mono hidden sm:block">
            Tip: Click any row to view order details &amp; edit tracking
          </p>
        </div>
      </div>

      {/* Orders Table — Click Row directly opens Order */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer &amp; City</th>
                <th className="py-3.5 px-4">Purchased Items</th>
                <th className="py-3.5 px-4">Total (INR)</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4">Courier Tracking</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-slate-50/90 cursor-pointer transition-colors group"
                >
                  {/* Order ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#1E3A2B] group-hover:underline">
                    {order.orderNumber}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{order.date}</td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 group-hover:text-[#1E3A2B] transition-colors">
                      {order.customerName}
                    </p>
                    <p className="text-[10px] text-slate-400">{order.customerCity}</p>
                  </td>

                  {/* Items */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 max-w-xs">
                      {order.items.map((it, idx) => (
                        <p key={idx} className="text-xs text-slate-700 truncate">
                          <span className="font-bold text-slate-900">{it.quantity}x</span> {it.productName}
                        </p>
                      ))}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-4 font-bold font-sans text-sm text-slate-900 whitespace-nowrap">
                    {formatINR(order.total)}
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Direct Status Selector (Simple inline update without opening modal) */}
                  <td
                    className="py-3.5 px-4"
                    onClick={(e) => e.stopPropagation()} // don't open modal when changing status dropdown
                  >
                    <CustomSelect
                      value={order.fulfillmentStatus}
                      onChange={(val) =>
                        handleUpdateStatus(order.id, val as AdminOrder['fulfillmentStatus'])
                      }
                      options={[
                        { value: 'Pending', label: 'Pending', badge: 'WAIT' },
                        { value: 'Processing', label: 'Processing', badge: 'PROD' },
                        { value: 'Shipped', label: 'Shipped', badge: 'AIR' },
                        { value: 'Completed', label: 'Completed', badge: 'DELV' }
                      ]}
                      className="w-36"
                      buttonClassName={`text-xs font-bold uppercase py-1 px-2.5 rounded-md border ${
                        order.fulfillmentStatus === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : order.fulfillmentStatus === 'Shipped'
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                          : order.fulfillmentStatus === 'Processing'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    />
                  </td>

                  {/* Courier Tracking Column */}
                  <td
                    className="py-3.5 px-4"
                    onClick={(e) => e.stopPropagation()} // don't trigger row modal
                  >
                    {order.trackingNumber ? (
                      <div className="flex items-center space-x-1.5 font-mono text-[11px] text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md w-fit">
                        <Truck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span className="truncate max-w-[130px]" title={order.trackingNumber}>
                          {order.trackingNumber}
                        </span>
                        <button
                          onClick={() => handleCopy(order.trackingNumber!, order.id)}
                          className="text-slate-400 hover:text-slate-900 p-0.5"
                          title="Copy tracking ID"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingTrackingOrderId(order.id);
                          setTrackingCarrier('Blue Dart Express');
                          setTrackingNumberInput('');
                        }}
                        className="text-[11px] font-semibold text-[#1E3A2B] hover:text-[#14261d] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ Add Tracking</span>
                      </button>
                    )}
                  </td>

                  {/* Action arrow */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center text-slate-400 group-hover:text-slate-900 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Add Tracking ID Inline Modal */}
      {editingTrackingOrderId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-md w-full p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-[#1E3A2B]" />
                <h3 className="font-serif text-lg font-bold text-slate-900">Add Dispatch Tracking</h3>
              </div>
              <button
                onClick={() => setEditingTrackingOrderId(null)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Courier Partner
                </label>
                <CustomSelect
                  value={trackingCarrier}
                  onChange={setTrackingCarrier}
                  options={COURIER_CARRIERS.map((c) => ({ value: c, label: c }))}
                  className="w-full"
                  buttonClassName="p-2.5 bg-slate-50 border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  AWB Tracking Number / Consignment ID
                </label>
                <input
                  type="text"
                  required
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  placeholder="e.g. BD-892401823IN"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none font-mono focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-slate-500 text-[11px] flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  Adding a tracking number will automatically transition this order's status to <strong>Shipped</strong> and dispatch shipping telemetry to the customer.
                </span>
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingTrackingOrderId(null)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTracking(editingTrackingOrderId)}
                  className="px-5 py-2 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs rounded-md shadow-xs transition-colors"
                >
                  Save &amp; Mark as Shipped
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Order Detail Modal (Opened directly on row click) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
                    ORDER SUMMARY
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
                      selectedOrder.fulfillmentStatus === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : selectedOrder.fulfillmentStatus === 'Shipped'
                        ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                        : selectedOrder.fulfillmentStatus === 'Processing'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {selectedOrder.fulfillmentStatus}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 leading-tight mt-1">
                  Order {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-500">Placed on {selectedOrder.date}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => showToast('Printing packing slip & tax invoice...')}
                  className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md border border-slate-200 transition-colors"
                  title="Print Packing Slip"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Status Pipeline Buttons */}
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1-Click Fulfillment Progression:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Pending', 'Processing', 'Shipped', 'Completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                    className={`py-2 px-3 text-xs uppercase font-bold tracking-wider rounded-md border transition-all ${
                      selectedOrder.fulfillmentStatus === st
                        ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'Pending'
                      ? '1. Pending'
                      : st === 'Processing'
                      ? '2. Packing'
                      : st === 'Shipped'
                      ? '3. Dispatched'
                      : '4. Delivered'}
                  </button>
                ))}
              </div>
            </div>

            {/* Courier & Tracking Section */}
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#1E3A2B]" />
                  <span className="font-serif text-base font-bold text-slate-900">
                    Courier &amp; Logistics Tracking
                  </span>
                </div>
                {selectedOrder.trackingNumber && (
                  <button
                    onClick={() => handleCopy(selectedOrder.trackingNumber!, selectedOrder.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedOrderId === selectedOrder.id ? 'Copied!' : 'Copy Tracking'}</span>
                  </button>
                )}
              </div>

              {selectedOrder.trackingNumber ? (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-1">
                  <p className="text-[11px] uppercase font-bold text-slate-500 font-mono">
                    Assigned Air Waybill (AWB)
                  </p>
                  <p className="font-mono font-bold text-sm text-slate-900">
                    {selectedOrder.trackingNumber}
                  </p>
                  <button
                    onClick={() => {
                      setEditingTrackingOrderId(selectedOrder.id);
                      setTrackingCarrier('Blue Dart Express');
                    }}
                    className="text-[11px] font-bold text-[#1E3A2B] hover:underline pt-1 block"
                  >
                    Edit or Reassign Tracking Number →
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-md flex items-center justify-between">
                  <span className="text-xs text-slate-500">No courier tracking number assigned yet.</span>
                  <button
                    onClick={() => {
                      setEditingTrackingOrderId(selectedOrder.id);
                      setTrackingCarrier('Blue Dart Express');
                    }}
                    className="px-3 py-1.5 bg-[#1E3A2B] text-white text-xs font-bold rounded-md hover:bg-[#14261d] transition-colors"
                  >
                    + Add Tracking ID
                  </button>
                </div>
              )}
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-lg text-xs">
              <div className="space-y-1">
                <p className="font-bold text-slate-900 uppercase">Customer Information</p>
                <p className="font-bold text-sm text-slate-900">{selectedOrder.customerName}</p>
                <p className="text-slate-600">{selectedOrder.customerEmail}</p>
                <p className="text-slate-600 font-mono">{selectedOrder.customerPhone}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 uppercase">Shipping Address</p>
                <p className="text-slate-700 leading-relaxed">{selectedOrder.shippingAddress}</p>
                <p className="text-slate-500 font-medium pt-1">
                  Destination City: <strong>{selectedOrder.customerCity}</strong>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <p className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Purchased Products ({selectedOrder.items.length})
              </p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-md text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-14 object-cover border border-slate-200 rounded-md bg-white"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.productName}</p>
                        {item.variantName && (
                          <p className="text-[10px] text-slate-500 font-semibold">{item.variantName}</p>
                        )}
                        <p className="text-[11px] text-slate-600">
                          {item.quantity} × {formatINR(item.price)}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-sm font-sans text-slate-900">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total breakdown */}
            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span>{formatINR(selectedOrder.total)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pan-India Express Freight</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>TOTAL (INCL. 18% GST)</span>
                <span className="text-base">{formatINR(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
