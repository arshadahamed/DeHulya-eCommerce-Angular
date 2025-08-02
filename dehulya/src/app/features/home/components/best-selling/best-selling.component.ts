import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../component/product-card/product-card.component';
import { QuickViewComponent } from '../../../../component/shared/quick-view/quick-view.component';
import { Category, CATEGORIES } from '../../../../data/category.data';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service'; // <-- import service
import { Observable, switchMap, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, QuickViewComponent],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css']
})
export class BestSellingComponent implements OnInit {
  categories = CATEGORIES;

  // BehaviorSubject to track active category tab reactively
  private activeTabSubject = new BehaviorSubject<Category>(CATEGORIES[0]);
  activeTab$ = this.activeTabSubject.asObservable();

  // Observable products filtered by active category
  filteredProducts$!: Observable<Product[]>;

  quickProduct?: Product;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Whenever activeTab changes, switch to filtered products for that category
    this.filteredProducts$ = this.activeTab$.pipe(
      switchMap(category => this.productService.getProductsByCategory(category))
    );
  }

  selectTab(cat: Category) {
    this.activeTabSubject.next(cat);
  }

  openQuickView(prod: Product) {
    this.quickProduct = prod;
  }

  closeQuickView() {
    this.quickProduct = undefined;
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
