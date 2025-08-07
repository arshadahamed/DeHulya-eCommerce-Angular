import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { ApiListResponse } from '../shared/model/models';



@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  private readonly baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  loadCategoriesFromApi(): Observable<Category[]> {
    return this.http.get<ApiListResponse<Category>>(`${this.baseUrl}/categories`).pipe(
      map(res => res.data ?? []),
      tap(list => this.categoriesSubject.next(list))
    );
  }

  loadProductsFromApi(): Observable<Product[]> {
    return this.http.get<ApiListResponse<Product & { category: Category }>>(`${this.baseUrl}/products`).pipe(
      map(res =>
        res.data.map(prod => ({
          ...prod,
          category_id: prod.category.id  // map nested category id to category_id
        }))
      ),
      tap(list => this.productsSubject.next(list))
    );
  }
}
