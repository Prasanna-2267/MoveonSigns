import type { Currency } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'India (INR ₹)', flag: '🇮🇳', exchangeRate: 1.0 },
  { code: 'USD', symbol: '$', name: 'United States (USD $)', flag: '🇺🇸', exchangeRate: 0.012 },
  { code: 'EUR', symbol: '€', name: 'Eurozone (EUR €)', flag: '🇪🇺', exchangeRate: 0.011 },
  { code: 'GBP', symbol: '£', name: 'United Kingdom (GBP £)', flag: '🇬🇧', exchangeRate: 0.0095 },
  { code: 'AUD', symbol: '$', name: 'Australia (AUD $)', flag: '🇦🇺', exchangeRate: 0.018 },
  { code: 'CAD', symbol: '$', name: 'Canada (CAD $)', flag: '🇨🇦', exchangeRate: 0.016 }
];
