import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const CurrencySelector: React.FC = () => {
  const { currentCurrency, setCurrency, allCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 text-xs text-[#FEFBF4] hover:opacity-80 transition-opacity font-medium tracking-wide"
        aria-expanded={isOpen}
      >
        <span>{currentCurrency.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#FEFBF4] text-[#294A3A] shadow-xl border border-[#294A3A]/15 py-2 z-50 rounded-sm">
          {allCurrencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-left hover:bg-[#F8F5EE] transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span>{curr.flag}</span>
                <span className="font-medium">{curr.name}</span>
              </div>
              {curr.code === currentCurrency.code && (
                <Check className="w-3.5 h-3.5 text-[#294A3A]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
