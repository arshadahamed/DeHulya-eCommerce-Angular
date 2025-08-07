import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  private productService = inject(ProductService);

  categories$: Observable<Category[]> = this.productService.loadCategoriesFromApi().pipe(
    startWith([] as Category[]),
    catchError(err => {
      console.error('Failed to load categories:', err);
      return of([] as Category[]);
    })
  );

  trackById = (_: number, c: Category) => c.id;
}
