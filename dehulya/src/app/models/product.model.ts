import { Category } from './category.model';

export interface Product {
  id: number;
  title: string;
  imgPrimary: string;
  imgSecondary?: string | null;
  price: number;
  salePrice?: number | null;
  isNew: boolean;
  onSale: boolean;
  isStock: boolean;
  countdownDate?: string | null;
  category_id: number;
  category: Category;
  description: string;
  status: 'active' | 'inactive';
}


