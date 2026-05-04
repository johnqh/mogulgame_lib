import type {
  PretendOffer,
  PretendOfferResolution,
  Transaction,
} from '@sudobility/mogulgame_types';

/** Maximum offer multiplier relative to pretend USD balance. */
export const MAX_OFFER_MULTIPLIER = 5;

/**
 * Calculates the maximum offer price a user can make.
 *
 * @param balance - The user's current pretend USD balance
 * @returns The maximum allowed offer price (5x balance)
 */
export const calculateMaxOffer = (balance: number): number => {
  return balance * MAX_OFFER_MULTIPLIER;
};

/**
 * Validates whether an offer price is within the allowed range.
 *
 * @param offerPrice - The proposed offer price
 * @param balance - The user's current pretend USD balance
 * @returns `null` if valid, or an error message string if invalid
 */
export const validateOfferPrice = (
  offerPrice: number,
  balance: number
): string | null => {
  if (offerPrice <= 0) {
    return 'Offer price must be positive';
  }
  const maxOffer = calculateMaxOffer(balance);
  if (offerPrice > maxOffer) {
    return `Offer exceeds maximum allowed ($${maxOffer.toLocaleString()})`;
  }
  return null;
};

/**
 * Calculates balance from a transaction ledger.
 *
 * @param transactions - The user's transaction history
 * @returns The computed balance (sum of all transaction amounts)
 */
export const calculateBalanceFromLedger = (
  transactions: Transaction[]
): number => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Counts active offers from a list of offers.
 */
export const countActiveOffers = (offers: PretendOffer[]): number => {
  return offers.filter(o => o.status === 'active').length;
};

/**
 * Counts won offers from a list of offers.
 */
export const countWonOffers = (offers: PretendOffer[]): number => {
  return offers.filter(o => o.status === 'won').length;
};

/**
 * Calculates the total value of active offers.
 */
export const totalActiveOfferValue = (offers: PretendOffer[]): number => {
  return offers
    .filter(o => o.status === 'active')
    .reduce((sum, o) => sum + o.offer_price, 0);
};

/**
 * Formats a resolution result into a human-readable summary.
 */
export const formatResolutionSummary = (
  resolution: PretendOfferResolution
): string => {
  const closingFormatted = `$${resolution.closing_price.toLocaleString()}`;
  const payoutFormatted = `$${resolution.payout_amount.toLocaleString()}`;

  if (!resolution.winner_user_id) {
    return `Property sold for ${closingFormatted}. No qualifying offers.`;
  }

  if (resolution.payout_type === 'solo_bonus') {
    return `Won! Property sold for ${closingFormatted}. Solo bonus: +${payoutFormatted}`;
  }

  return `Won! Property sold for ${closingFormatted}. Payout from competitor: +${payoutFormatted}`;
};
