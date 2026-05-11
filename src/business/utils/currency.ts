import type { CountryCode } from '@sudobility/mogulgame_types';

const CURRENCY_MAP: Record<CountryCode, { code: string; symbol: string }> = {
  US: { code: 'USD', symbol: '$' },
  CA: { code: 'CAD', symbol: 'CA$' },
  GB: { code: 'GBP', symbol: '\u00A3' },
  AE: { code: 'AED', symbol: 'AED ' },
  ES: { code: 'EUR', symbol: '\u20AC' },
  AU: { code: 'AUD', symbol: 'A$' },
};

export function formatPrice(amount: number, country: CountryCode): string {
  const { symbol } = CURRENCY_MAP[country];
  return `${symbol}${amount.toLocaleString()}`;
}

export function formatPriceShort(amount: number, country: CountryCode): string {
  const { symbol } = CURRENCY_MAP[country];
  if (amount >= 1_000_000)
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${symbol}${(amount / 1_000).toFixed(0)}K`;
  return `${symbol}${amount.toLocaleString()}`;
}

export function getCurrencySymbol(country: CountryCode): string {
  return CURRENCY_MAP[country].symbol;
}

export function getCurrencyCode(country: CountryCode): string {
  return CURRENCY_MAP[country].code;
}
