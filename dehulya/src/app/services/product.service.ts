import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ALL_PRODUCTS } from '../data/product.data';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject = new BehaviorSubject<Product[]>(ALL_PRODUCTS);
  products$ = this.productsSubject.asObservable();

  // Simulate fetching products from an API with a delay
  fetchProducts(): Observable<Product[]> {
    return of(ALL_PRODUCTS).pipe(delay(500)); // simulate API call delay
  }

  //filter products by active status and stock availability
  getActiveInStockProducts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products =>
        products.filter(p => p.status === 'active' && p.isStock)
      )
    );
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.products$.pipe(
      map(products =>
        products.filter(p => p.category === category && p.status === 'active')
      )
    );
  }
}
