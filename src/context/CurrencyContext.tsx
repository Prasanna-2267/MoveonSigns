import React, { createContext, useContext, useState } from 'react';
import type { Currency } from '../types';
import { CURRENCIES } from '../data/currencies';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (amountInINR: number) => string;
  allCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrencyState] = useState<Currency>(CURRENCIES[0]);

  const setCurrency = (code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) {
      setCurrentCurrencyState(found);
    }
  };

  const formatPrice = (amountInINR: number): string => {
    if (currentCurrency.code === 'INR') {
      const formatted = new Intl.NumberFormat('en-IN').format(Math.round(amountInINR));
      return `₹${formatted} INR`;
    }

    const converted = amountInINR * currentCurrency.exchangeRate;
    const rounded = Math.round(converted);

    switch (currentCurrency.code) {
      case 'GBP':
        return `£${rounded} ${currentCurrency.code}`;
      case 'EUR':
        return `€${rounded} ${currentCurrency.code}`;
      default:
        return `$${rounded} ${currentCurrency.code}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrency,
        formatPrice,
        allCurrencies: CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
