import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit3, Eye, X } from 'lucide-react';
import { COLLECTIONS } from '../../data/collections';
import type { Collection } from '../../types';

export const AdminCollections: React.FC = () => {
  const [collectionsList, setCollectionsList] = useState<Collection[]>(COLLECTIONS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newCol: Collection = {
      id: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle,
      subtitle: newSubtitle,
      description: newDescription
    };

    setCollectionsList([...collectionsList, newCol]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      setCollectionsList(collectionsList.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 bg-white p-6 rounded-lg shadow-xs">
        <div>
          <h1 className="font-serif text-3xl text-slate-900 font-bold">Collections &amp; Categories</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Category Taxonomy, Banner Media &amp; Product Groupings
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#1E3A2B] hover:bg-[#14261d] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center space-x-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Collection</span>
        </button>
      </div>

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionsList.map((col) => (
          <div
            key={col.id}
            className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 font-bold rounded">
                  /collections/{col.slug}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">MANUAL</span>
              </div>
              <Link
                to={`/admin/collections/edit/${col.id}`}
                className="font-serif text-xl text-slate-900 font-bold hover:text-[#1E3A2B] hover:underline block"
              >
                {col.title}
              </Link>
              {col.subtitle && (
                <p className="text-[11px] font-bold text-slate-500 uppercase">{col.subtitle}</p>
              )}
              <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                {col.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Studio Edit Button */}
                <Link
                  to={`/admin/collections/edit/${col.id}`}
                  className="text-xs font-semibold bg-[#1E3A2B] text-white hover:bg-[#14261d] px-3 py-1.5 rounded-md flex items-center space-x-1 transition-colors shadow-xs"
                  title="Open full collection studio editor"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Studio Edit</span>
                </Link>

                {/* View live link */}
                <a
                  href={`/collections/${col.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1 p-1.5 hover:bg-slate-100 rounded-md"
                >
                  <span>View</span>
                  <Eye className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(col.id)}
                className="text-slate-400 hover:text-[#C71910] p-1.5 hover:bg-red-50 rounded-md transition-colors"
                title="Delete Collection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-lg max-w-md w-full p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">Create Collection</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCollection} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Collection Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Architectural Blade Signs"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Outdoor and indoor hanging signage"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Collection summary for customers..."
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-md outline-none resize-none focus:border-slate-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E3A2B] text-white font-bold text-xs rounded-md hover:bg-[#14261d]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
