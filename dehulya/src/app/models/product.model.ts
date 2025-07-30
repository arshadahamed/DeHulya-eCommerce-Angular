export interface Product {
  id: number;
  title: string;
  imgPrimary: string;
  imgSecondary?: string;
  price: number;
  salePrice?: number;
  isNew: boolean;
  onSale: boolean;
  countdownDate?: string; // e.g. "2026/06/01"
  category: 'Diamond' | 'Gold' | 'Silver' | 'Platinum';

  /** New fields for quick‐view: */
  description?: string;
  variants?: string[];
}
