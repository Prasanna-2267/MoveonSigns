import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../data/navigation';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <footer className="bg-[#294A3A] text-[#FEFBF4] pt-20 pb-12 border-t border-[#294A3A]">
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Newsletter & Social (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-serif text-2xl tracking-tight text-[#FEFBF4]">
            Join Our Mailing List
          </h3>
          <p className="text-xs text-[#FEFBF4]/80 leading-relaxed max-w-md">
            Sign up to our mailing list to receive updates on new products, journal posts, studio projects, and exclusive previews.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Your email address"
                className="flex-1 bg-[#FEFBF4] text-[#294A3A] px-4 py-3.5 text-xs outline-none rounded-none placeholder:text-[#294A3A]/50 border border-transparent focus:border-[#FEFBF4]"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-[#FEFBF4] text-[#294A3A] border border-[#FEFBF4] text-xs font-semibold uppercase tracking-widest px-6 py-3.5 hover:bg-[#213B2E] hover:text-[#FEFBF4] hover:border-[#FEFBF4] transition-all cursor-pointer whitespace-nowrap"
              >
                {status === 'submitting' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-[11px] text-[#C71910] uppercase tracking-wider font-semibold">
                Please enter a valid email address.
              </p>
            )}

            {status === 'success' && (
              <p className="text-[11px] text-[#FEFBF4] uppercase tracking-wider font-semibold">
                ✓ Thank you for subscribing!
              </p>
            )}
          </form>

          {/* Social Links */}
          <div className="pt-4 space-y-2">
            <p className="text-[11px] uppercase tracking-widest text-[#FEFBF4]/60 font-semibold">
              FOLLOW US
            </p>
            <div className="flex space-x-6 text-xs text-[#FEFBF4]/90">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline tracking-wider"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline tracking-wider"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline tracking-wider"
              >
                TikTok
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline tracking-wider"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Links (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4 lg:pt-0">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FEFBF4]/60 font-bold mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FEFBF4]/85">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FEFBF4]/60 font-bold mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FEFBF4]/85">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FEFBF4]/60 font-bold mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FEFBF4]/85">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FEFBF4]/60 font-bold mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FEFBF4]/85">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-[1650px] mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-[#FEFBF4]/10 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#FEFBF4]/60 space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} MOVE ON SIGNS ®. ALL RIGHTS RESERVED.</p>
        <p>Simple, minimal &amp; architectural signage for modern Indian &amp; global spaces.</p>
      </div>
    </footer>
  );
};
