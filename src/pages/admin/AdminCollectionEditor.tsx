import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';
import type { Collection } from '../../types';

export const AdminCollectionEditor: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();

  const initialCol =
    COLLECTIONS.find((c) => c.id === collectionId || c.slug === collectionId) || COLLECTIONS[0];

  const [collection, setCollection] = useState<Collection>({ ...initialCol });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-white border border-slate-200 p-4 sticky top-16 z-20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin/collections')}
            className="p-2 hover:bg-slate-100 text-slate-600 rounded-md transition-colors"
            title="Back to Collections"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
              COLLECTION STUDIO EDITOR
            </span>
            <h1 className="font-serif text-2xl text-slate-900 font-bold leading-tight">
              {collection.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={`/collections/${collection.slug}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center space-x-1.5 rounded-md shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Collection Page</span>
          </a>

          <button
            onClick={() => handleSave()}
            className="px-5 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'COLLECTION SAVED!' : 'SAVE & PUBLISH'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Clean Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-xs space-y-4">
            <h2 className="font-serif text-xl text-slate-900 font-bold border-b border-slate-100 pb-3">
              Collection Details
            </h2>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Collection Title
                </label>
                <input
                  type="text"
                  value={collection.title}
                  onChange={(e) => setCollection({ ...collection, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md text-sm font-semibold outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Editorial Subtitle
                  </label>
                  <input
                    type="text"
                    value={collection.subtitle || ''}
                    onChange={(e) => setCollection({ ...collection, subtitle: e.target.value })}
                    placeholder="e.g. Architectural Signage Collection"
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={collection.slug}
                    onChange={(e) => setCollection({ ...collection, slug: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none font-mono text-[11px] focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Collection Description
                </label>
                <textarea
                  rows={5}
                  value={collection.description}
                  onChange={(e) => setCollection({ ...collection, description: e.target.value })}
                  placeholder="Enter long-form customer overview..."
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md outline-none resize-none leading-relaxed focus:border-slate-400 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Collection Preview (5 cols) */}
        <div className="xl:col-span-5 sticky top-36 space-y-6">
          <div className="bg-white border-2 border-slate-900 p-6 shadow-xl space-y-5 rounded-lg">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                COLLECTION PAGE HEADER PREVIEW
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
            </div>

            <div className="text-center py-6 space-y-2 border-b border-slate-100 bg-slate-50 rounded-md p-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono block">
                /collections/{collection.slug}
              </span>
              <h2 className="font-serif text-3xl text-slate-900 font-bold">{collection.title}</h2>
              {collection.subtitle && (
                <p className="text-xs uppercase font-bold text-slate-600">{collection.subtitle}</p>
              )}
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed pt-1">
                {collection.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
