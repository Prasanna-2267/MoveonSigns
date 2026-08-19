import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  variant?: 'admin' | 'storefront' | 'minimal';
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  variant = 'admin',
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'storefront':
        return {
          button:
            'bg-white border border-[#294A3A]/20 hover:border-[#294A3A]/50 text-[#294A3A] text-xs font-serif uppercase tracking-wider px-3.5 py-2.5 rounded-sm shadow-2xs hover:shadow-xs',
          menu: 'bg-[#FEFBF4] border border-[#294A3A]/15 shadow-xl rounded-md p-1.5 text-[#294A3A]',
          activeItem: 'bg-[#294A3A] text-[#FEFBF4] font-medium',
          inactiveItem: 'text-[#294A3A]/80 hover:bg-[#294A3A]/5 hover:text-[#294A3A]'
        };
      case 'minimal':
        return {
          button:
            'bg-transparent hover:bg-slate-100/80 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-md border border-transparent hover:border-slate-200',
          menu: 'bg-white border border-slate-200 shadow-lg rounded-xl p-1 text-slate-800',
          activeItem: 'bg-slate-100 text-slate-900 font-bold',
          inactiveItem: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        };
      case 'admin':
      default:
        return {
          button:
            'bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-lg shadow-2xs hover:shadow-xs focus:ring-2 focus:ring-slate-100',
          menu: 'bg-white border border-slate-200/90 shadow-xl rounded-xl p-1.5 text-slate-800 backdrop-blur-md',
          activeItem: 'bg-slate-100 text-slate-900 font-bold',
          inactiveItem: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full space-x-2 transition-all outline-none cursor-pointer ${styles.button} ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2 truncate">
          {icon && <span className="text-slate-400 flex-shrink-0">{icon}</span>}
          {selectedOption?.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate uppercase tracking-wider">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-1.5 ${
            isOpen ? 'rotate-180 text-slate-700' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 mt-1.5 w-full min-w-[190px] z-50 animate-fade-in ${styles.menu} ${menuClassName}`}
          role="listbox"
        >
          <div className="max-h-60 overflow-y-auto space-y-0.5 scrollbar-thin">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors text-left cursor-pointer ${
                    isSelected ? styles.activeItem : styles.inactiveItem
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center space-x-2 truncate">
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                    <span className="truncate uppercase tracking-wide text-[11px] font-semibold">
                      {option.label}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 ml-2 flex-shrink-0">
                    {option.badge && (
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-bold">
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
