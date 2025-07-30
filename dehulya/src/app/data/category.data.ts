export const CATEGORIES = [
  'Diamond',
  'Gold',
  'Silver',
  'Platinum',
  'Emerald'
] as const;

export type Category = typeof CATEGORIES[number];
