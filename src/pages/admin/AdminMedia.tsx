import React, { useState } from 'react';
import { Upload, Search, Trash2 } from 'lucide-react';
import { INITIAL_MEDIA } from '../../data/adminMockData';
import type { AdminMediaItem } from '../../data/adminMockData';

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<AdminMediaItem[]>(INITIAL_MEDIA);
  const [search, setSearch] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<AdminMediaItem | null>(null);

  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.altText.toLowerCase().includes(search.toLowerCase())
  );

  const handleUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newMedia: AdminMediaItem = {
        id: `med-${Date.now()}`,
        name: file.name,
        type: 'image',
        url: URL.createObjectURL(file),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dimensions: '1920 x 1080',
        uploadedDate: new Date().toISOString().split('T')[0],
        altText: file.name.replace(/\.[^/.]+$/, ''),
        usedIn: ['Media Library']
      };
      setMediaList([newMedia, ...mediaList]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete media asset?')) {
      setMediaList(mediaList.filter((m) => m.id !== id));
      if (selectedMedia?.id === id) setSelectedMedia(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#294A3A]/15 gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#294A3A]">Media Asset Library</h1>
          <p className="text-xs text-[#294A3A]/70 uppercase tracking-widest mt-1">
            Store Product Photography, Editorial Lookbooks &amp; Banner Assets
          </p>
        </div>

        <label className="gw-button-primary py-3 px-5 text-xs flex items-center space-x-2 cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>UPLOAD FILES</span>
          <input type="file" onChange={handleUploadMock} className="hidden" accept="image/*,video/*" />
        </label>
      </div>

      {/* Search */}
      <div className="bg-[#FEFBF4] p-4 border border-[#294A3A]/15 flex items-center justify-between">
        <div className="flex items-center bg-[#F8F5EE] border border-[#294A3A]/20 px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#294A3A]/50 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name, alt text..."
            className="bg-transparent text-xs text-[#294A3A] outline-none w-full"
          />
        </div>
        <span className="text-xs font-mono text-[#294A3A]/60">
          {filtered.length} files
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className={`group relative aspect-[4/5] bg-[#F8F5EE] border overflow-hidden cursor-pointer transition-all ${
              selectedMedia?.id === item.id ? 'border-[#294A3A] ring-2 ring-[#294A3A]' : 'border-[#294A3A]/15 hover:border-[#294A3A]/50'
            }`}
          >
            <img
              src={item.url}
              alt={item.altText}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-[#FEFBF4]">
              <p className="text-[11px] font-bold truncate">{item.name}</p>
              <p className="text-[9px] opacity-80">{item.size}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Media Drawer Details */}
      {selectedMedia && (
        <div className="bg-[#FEFBF4] border border-[#294A3A]/20 p-6 shadow-md flex flex-col md:flex-row gap-6 items-start">
          <img
            src={selectedMedia.url}
            alt={selectedMedia.altText}
            className="w-32 h-40 object-cover border border-[#294A3A]/15 bg-[#F8F5EE]"
          />
          <div className="flex-1 space-y-2 text-xs">
            <h3 className="font-bold text-base text-[#294A3A]">{selectedMedia.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#294A3A]/70 pt-1">
              <div><strong>Size:</strong> {selectedMedia.size}</div>
              <div><strong>Dimensions:</strong> {selectedMedia.dimensions}</div>
              <div><strong>Uploaded:</strong> {selectedMedia.uploadedDate}</div>
              <div><strong>Used in:</strong> {selectedMedia.usedIn.join(', ')}</div>
            </div>
            <div className="pt-2">
              <label className="block font-bold text-[#294A3A] uppercase mb-1">Alt Text</label>
              <input
                type="text"
                value={selectedMedia.altText}
                onChange={(e) =>
                  setSelectedMedia({ ...selectedMedia, altText: e.target.value })
                }
                className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-2 outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => handleDelete(selectedMedia.id)}
            className="text-[#C71910] hover:underline text-xs font-bold flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Asset</span>
          </button>
        </div>
      )}
    </div>
  );
};
