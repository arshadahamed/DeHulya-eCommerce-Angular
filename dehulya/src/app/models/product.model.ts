import { Category } from './category.model';

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
  countdownDate?: string;
  category: Category;  // category as object
  description?: string;
  status: 'active' | 'inactive';
}
