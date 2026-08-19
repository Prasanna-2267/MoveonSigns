import React, { useState } from 'react';
import { Trash2, ArrowUp, ArrowDown, Menu, Check } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import type { NavItem } from '../../types';

export const AdminNavigation: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>(MAIN_NAV_ITEMS);
  const [newLabel, setNewLabel] = useState('');
  const [newPath, setNewPath] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const updated = [...navItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setNavItems(updated);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newPath) return;

    setNavItems([...navItems, { label: newLabel, path: newPath }]);
    setNewLabel('');
    setNewPath('');
  };

  const handleDelete = (index: number) => {
    setNavItems(navItems.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Navigation Menu Builder</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Storefront Header Menu, Dropdowns &amp; Nested Links
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-xs transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>{savedMessage ? 'Saved Successfully!' : 'Publish Menu'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Menu Items List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
          <h2 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Header Primary Links
          </h2>

          <div className="space-y-3">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-3">
                  <Menu className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="font-bold text-sm text-slate-900">{item.label}</p>
                    <p className="text-[11px] font-mono text-slate-500">{item.path}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 rounded text-slate-700"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === navItems.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 rounded text-slate-700"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1.5 text-slate-400 hover:text-[#C71910] hover:bg-red-50 rounded"
                    title="Delete link"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Link Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4 h-fit">
          <h2 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Add Navigation Link
          </h2>

          <form onSubmit={handleAddLink} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-bold uppercase mb-1 text-slate-700">Display Label</label>
              <input
                type="text"
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Shop A-Frame Signs"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
              />
            </div>

            <div>
              <label className="block font-bold uppercase mb-1 text-slate-700">Destination URL / Route</label>
              <input
                type="text"
                required
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="e.g. /collections/signage"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none font-mono focus:border-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold rounded-md text-xs uppercase tracking-wider shadow-xs transition-colors"
            >
              + ADD TO MENU
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
