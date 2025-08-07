import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { apiResultFormat } from '../shared/model/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private productListCache$: Observable<apiResultFormat> | null = null;

  constructor(private http: HttpClient) {}

  getProductList(): Observable<apiResultFormat> {
    if (!this.productListCache$) {
      this.productListCache$ = this.http.get<apiResultFormat>('http://127.0.0.1:8000/api/products').pipe(
        catchError(err => {
          console.error('Error fetching product list:', err);
          return throwError(() => new Error('Failed to load product list'));
        }),
        shareReplay(1)
      );
    }
    return this.productListCache$;
  }

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

  updateProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  getActiveInStockProducts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.status === 'active' && p.isStock))
    );
  }

  getProductsByCategory(categoryTitle: string): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.category?.title === categoryTitle && p.status === 'active'))
    );
  }
}
