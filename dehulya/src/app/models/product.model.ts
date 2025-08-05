export interface Product {
  id: number;
  title: string;
  imgPrimary: string;
  imgSecondary?: string;
  price: number;
  salePrice?: number;
  isNew: boolean;
  onSale: boolean;
  isStock: boolean;
  countdownDate?: string; // ISO 8601 date string recommended, e.g. "2026-06-01T00:00:00Z"
  category: 'Diamond' | 'Gold' | 'Silver' | 'Platinum' | 'Emerald'; // Added Emerald for future-proofing

  /** Optional descriptive fields for enhanced UI */
  description?: string;

  /** Product availability status */
  status: 'active' | 'inactive';
}
