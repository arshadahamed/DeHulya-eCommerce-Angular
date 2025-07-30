import { Product } from "../models/product.model";


export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'W. Men Formal T-shirt',
    imgPrimary: '/assets/img/grid/grid__17.png',
    imgSecondary: '/assets/img/grid/grid__18.png',
    price: 72.00,
    salePrice: 47.25,
    isNew: true,
    onSale: true,
    countdownDate: '2025-09-30T23:59:59',
    category: 'Diamond'
  },
  {
    id: 2,
    title: 'W. Men Formal T-shirt',
    imgPrimary: '/assets/img/grid/grid__19.png',
    imgSecondary: '/assets/img/grid/grid__20.png',
    price: 72,
    salePrice: 47,
    isNew: true,
    onSale: true,
    category: 'Diamond',
    description: 'we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensuel...',
    variants: []
  },{
    id: 3,
    title: 'W. Men Formal T-shirt',
    imgPrimary: '/assets/img/grid/grid__21.png',
    imgSecondary: '/assets/img/grid/grid__22.png',
    price: 72,
    salePrice: 47,
    isNew: false,
    onSale: true,
    category: 'Silver',
    description: 'we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensuel...',
    variants: []
  }

];
