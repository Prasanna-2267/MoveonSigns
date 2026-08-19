import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const AdminHomepageContent: React.FC = () => {
  const [announcementText, setAnnouncementText] = useState('Free shipping across India on all orders over ₹4,999.');
  const [heroTitle, setHeroTitle] = useState('THE BAKERY DISPLAY CASE PRO');
  const [heroSubtitle, setHeroSubtitle] = useState('AVAILABLE FOR PREORDER');
  const [leftBadge, setLeftBadge] = useState('ONLINE NOW');
  const [rightBadge, setRightBadge] = useState('NEW');
  const [brandQuote, setBrandQuote] = useState('Functional, minimal & playful signage products');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#294A3A]/15 gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#294A3A]">Homepage Visual CMS</h1>
          <p className="text-xs text-[#294A3A]/70 uppercase tracking-widest mt-1">
            Edit Announcement Bar, Hero Typography, Editorial Badges &amp; Story Text
          </p>
        </div>

        <button
          onClick={handleSave}
          className="gw-button-primary py-3 px-5 text-xs flex items-center space-x-2 shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'CHANGES PUBLISHED!' : 'PUBLISH CHANGES'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs font-sans">
        {/* Announcement Bar Editor */}
        <div className="bg-[#FEFBF4] p-6 border border-[#294A3A]/15 shadow-xs space-y-4">
          <h2 className="font-serif text-xl text-[#294A3A] border-b border-[#294A3A]/10 pb-3 flex items-center space-x-2">
            <span className="w-3 h-3 bg-[#C71910] inline-block rounded-full" />
            <span>Top Announcement Bar</span>
          </h2>
          <div>
            <label className="block font-bold uppercase mb-1">Announcement Copy</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3 text-xs outline-none"
            />
          </div>
        </div>

        {/* Hero Section Editor */}
        <div className="bg-[#FEFBF4] p-6 border border-[#294A3A]/15 shadow-xs space-y-4">
          <h2 className="font-serif text-xl text-[#294A3A] border-b border-[#294A3A]/10 pb-3">
            Hero Section &amp; Badges
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-bold uppercase mb-1">Hero Title (Uppercase Condensed)</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3 text-xs outline-none text-[#C71910] font-bold"
              />
            </div>

            <div>
              <label className="block font-bold uppercase mb-1">Subtext / Button Label</label>
              <input
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3 text-xs outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase mb-1">Left Oval Badge</label>
                <input
                  type="text"
                  value={leftBadge}
                  onChange={(e) => setLeftBadge(e.target.value)}
                  className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3 text-xs outline-none"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Right Oval Badge</label>
                <input
                  type="text"
                  value={rightBadge}
                  onChange={(e) => setRightBadge(e.target.value)}
                  className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Quote Editor */}
        <div className="bg-[#FEFBF4] p-6 border border-[#294A3A]/15 shadow-xs space-y-4">
          <h2 className="font-serif text-xl text-[#294A3A] border-b border-[#294A3A]/10 pb-3">
            Editorial Brand Philosophy
          </h2>
          <div>
            <label className="block font-bold uppercase mb-1">Magazine Spread Headline</label>
            <input
              type="text"
              value={brandQuote}
              onChange={(e) => setBrandQuote(e.target.value)}
              className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3 text-xs outline-none font-serif italic text-base"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
