// product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, catchError, shareReplay } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { apiResultFormat } from '../shared/model/models';
import { HttpClient } from '@angular/common/http';

type ProductCategory = 'Diamond' | 'Gold' | 'Silver' | 'Platinum' | 'Emerald'; // match Product.category union type

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  // Cache for API call
  private productListCache$: Observable<apiResultFormat> | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Fetch product list from JSON file with caching and error handling
   */
  getProductList(): Observable<apiResultFormat> {
    if (!this.productListCache$) {
      this.productListCache$ = this.http
        .get<apiResultFormat>('/json/product-list.json')
        .pipe(
          catchError(err => {
            console.error('Error fetching product list:', err);
            return throwError(() => new Error('Failed to load product list'));
          }),
          shareReplay(1)
        );
    }
    return this.productListCache$;
  }

  /**
   * Load product data from API JSON and update BehaviorSubject
   */
  loadProductsFromApi(): Observable<void> {
  return this.getProductList().pipe(
    map(res => {
      this.updateProducts(res.data);
    }),
    catchError(err => {
      console.error('Failed to load products from API', err);
      return of();
    })
  );
}


  /**
   * Update current product list in BehaviorSubject
   */
  updateProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  /**
   * Filter active products that are in stock
   */
  getActiveInStockProducts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.status === 'active' && p.isStock))
    );
  }

  /**
   * Get products by category (typed for safety)
   */
  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return this.products$.pipe(
      map(products =>
        products.filter(p => p.category === category && p.status === 'active')
      )
    );
  }
}
