import React, { useState } from 'react';
import { Send, CheckCircle2, Clock } from 'lucide-react';
import { INITIAL_ABANDONED_CARTS } from '../../data/adminMockData';
import type { AdminAbandonedCart } from '../../data/adminMockData';

export const AdminAbandonedCarts: React.FC = () => {
  const [carts, setCarts] = useState<AdminAbandonedCart[]>(INITIAL_ABANDONED_CARTS);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;

  const handleSendRecovery = (id: string) => {
    setCarts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, recoveryStatus: 'Email Sent' } : c))
    );
    alert('Recovery email and SMS incentive sent to customer!');
  };

  const totalValue = carts.reduce((acc, c) => acc + c.cartValue, 0);

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Abandoned Cart Recovery</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Re-engage customers who left items in cart before checkout completion
          </p>
        </div>

        <div className="bg-slate-50 px-4 py-2 border border-slate-200 rounded-md text-xs font-mono">
          <span className="text-slate-500">Recoverable Revenue: </span>
          <span className="font-bold text-[#C71910] text-sm">{formatINR(totalValue)}</span>
        </div>
      </div>

      {/* Abandoned Carts Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Abandoned Products</th>
                <th className="py-3.5 px-4">Cart Value (INR)</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4">Recovery Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {carts.map((cart) => (
                <tr key={cart.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-sm text-slate-900">{cart.customerName}</p>
                    <p className="text-[11px] text-slate-500">{cart.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                    {cart.itemsSummary}
                  </td>
                  <td className="py-3.5 px-4 font-bold font-sans text-sm text-slate-900">
                    {formatINR(cart.cartValue)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 flex items-center pt-4">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    <span>{cart.lastActivity}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
                        cart.recoveryStatus === 'Recovered'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : cart.recoveryStatus === 'Email Sent'
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-red-50 text-[#C71910] border border-red-200'
                      }`}
                    >
                      {cart.recoveryStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {cart.recoveryStatus !== 'Recovered' ? (
                      <button
                        onClick={() => handleSendRecovery(cart.id)}
                        className="px-3 py-1.5 bg-[#1E3A2B] text-white text-xs font-semibold rounded-md hover:bg-[#14261d] transition-colors flex items-center space-x-1.5 ml-auto shadow-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Recovery</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Recovered</span>
                      </span>
                    )}
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
