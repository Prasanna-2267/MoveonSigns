import React, { useState } from 'react';
import {
  Truck,
  Check,
  Package,
  Globe,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ShippingRate {
  id: string;
  method: string;
  price: number;
  days: string;
  carrier: string;
  active: boolean;
}

interface ShippingZone {
  id: string;
  name: string;
  regions: string;
  rates: ShippingRate[];
}

export const AdminShipping: React.FC = () => {
  const [threshold, setThreshold] = useState(4999);
  const [zones, setZones] = useState<ShippingZone[]>([
    {
      id: 'zone-metro',
      name: 'India Metro Hubs',
      regions: 'Mumbai, Bengaluru, Delhi NCR, Chennai, Hyderabad, Kolkata, Pune',
      rates: [
        {
          id: 'r1',
          method: 'Express Air Courier (Blue Dart / Delhivery)',
          price: 0,
          days: '2-3 Business Days',
          carrier: 'Blue Dart Air',
          active: true
        },
        {
          id: 'r2',
          method: 'Same-Day Hyperlocal Courier (Select Pincodes)',
          price: 499,
          days: 'Same Day (Within 6 Hours)',
          carrier: 'Dunzo / Porter Pro',
          active: true
        }
      ]
    },
    {
      id: 'zone-national',
      name: 'Rest of India (Tier 2 & Tier 3)',
      regions: 'All other Indian states, union territories, and tier 2/3 pin codes',
      rates: [
        {
          id: 'r3',
          method: 'Standard Express Surface Freight',
          price: 0,
          days: '3-5 Business Days',
          carrier: 'Delhivery Surface',
          active: true
        },
        {
          id: 'r4',
          method: 'Priority Express Delivery',
          price: 350,
          days: '2-3 Business Days',
          carrier: 'Blue Dart Express',
          active: true
        }
      ]
    },
    {
      id: 'zone-intl',
      name: 'International Freight (DHL / FedEx Express)',
      regions: 'United States, United Kingdom, UAE, Singapore, Australia, Europe',
      rates: [
        {
          id: 'r5',
          method: 'Tracked Air Cargo Express',
          price: 4500,
          days: '5-8 Business Days',
          carrier: 'DHL Express Worldwide',
          active: true
        }
      ]
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleRate = (zoneId: string, rateId: string) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              rates: z.rates.map((r) => (r.id === rateId ? { ...r, active: !r.active } : r))
            }
          : z
      )
    );
    showToast('Shipping rate status updated.');
  };

  const handleUpdatePrice = (zoneId: string, rateId: string, newPrice: number) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              rates: z.rates.map((r) => (r.id === rateId ? { ...r, price: Math.max(0, newPrice) } : r))
            }
          : z
      )
    );
  };

  const handleSaveAll = () => {
    showToast('All shipping rules, zones, and freight rates saved!');
  };

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
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Shipping &amp; Logistics Setup</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Pan-India Freight Rules, Free Delivery Threshold &amp; Courier Zones
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-xs transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Free Shipping Rule Banner */}
      <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#1E3A2B] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Pan-India Free Shipping Threshold
              </h2>
              <p className="text-xs text-slate-500">
                Automatic free delivery qualification across Indian pin codes
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 font-bold rounded">
            ACTIVE RULE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-1">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Minimum Cart Subtotal for Free Express Courier (INR ₹)
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md max-w-xs">
              <span className="text-base font-bold text-slate-900 mr-2">₹</span>
              <input
                type="number"
                min="0"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="bg-transparent text-base font-bold text-slate-900 outline-none w-full font-mono"
              />
              <span className="text-xs text-slate-400 font-mono">INR</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Orders equal to or above ₹{new Intl.NumberFormat('en-IN').format(threshold)} unlock complimentary express delivery.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs space-y-1">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Customer Storefront Notification Banner:</span>
            </div>
            <p className="text-emerald-800 font-sans italic">
              "Complimentary Express Air Freight on all orders over ₹{new Intl.NumberFormat('en-IN').format(threshold)} across India."
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Configured Shipping Zones</h2>

        <div className="space-y-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <span>{zone.name}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{zone.regions}</p>
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 font-bold rounded w-fit">
                  {zone.rates.length} Delivery Options
                </span>
              </div>

              {/* Rates list */}
              <div className="space-y-3">
                {zone.rates.map((rate) => (
                  <div
                    key={rate.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-md gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-sm text-slate-900">{rate.method}</p>
                        <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                          {rate.carrier}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Estimated Transit: {rate.days}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Price input */}
                      <div className="flex items-center space-x-1 bg-white border border-slate-200 px-2 py-1.5 rounded-md">
                        <span className="text-xs font-bold text-slate-500">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={rate.price}
                          onChange={(e) =>
                            handleUpdatePrice(zone.id, rate.id, Number(e.target.value))
                          }
                          className="w-16 font-bold text-xs text-slate-900 outline-none font-mono"
                        />
                        <span className="text-[10px] text-slate-400">
                          {rate.price === 0 ? '(FREE)' : 'INR'}
                        </span>
                      </div>

                      {/* Active toggle */}
                      <button
                        onClick={() => handleToggleRate(zone.id, rate.id)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md border transition-all ${
                          rate.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                      >
                        {rate.active ? '● Enabled' : '○ Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Packaging Presets */}
      <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          Packaging &amp; Crate Presets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-1.5">
            <Package className="w-5 h-5 text-slate-600 mb-1" />
            <p className="font-bold text-slate-900">Small Architectural Carton</p>
            <p className="text-slate-500">Tabletop signs, brackets, screws</p>
            <span className="text-[10px] font-mono text-slate-400 block">Up to 2.5 kg | 30×20×15 cm</span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-1.5">
            <Package className="w-5 h-5 text-slate-600 mb-1" />
            <p className="font-bold text-slate-900">Reinforced Signboard Box</p>
            <p className="text-slate-500">A-Frames, round blade signs</p>
            <span className="text-[10px] font-mono text-slate-400 block">Up to 8.0 kg | 65×65×20 cm</span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-1.5">
            <Package className="w-5 h-5 text-slate-600 mb-1" />
            <p className="font-bold text-slate-900">Heavy-Duty Glass Crate</p>
            <p className="text-slate-500">Counter display cases, toughened glass</p>
            <span className="text-[10px] font-mono text-slate-400 block">Up to 22.0 kg | 90×75×50 cm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
