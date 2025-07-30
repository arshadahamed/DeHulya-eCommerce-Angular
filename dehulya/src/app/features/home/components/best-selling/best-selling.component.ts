import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../component/product-card/product-card.component';
import { QuickViewComponent } from '../../../../component/shared/quick-view/quick-view.component';
import { Category, CATEGORIES } from '../../../../data/category.data';
import { Product } from '../../../../models/product.model';
import { ALL_PRODUCTS } from '../../../../data/product.data';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, QuickViewComponent],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css']
})
export class BestSellingComponent implements OnInit {
  categories = CATEGORIES;
  activeTab: Category = CATEGORIES[0];
  products = ALL_PRODUCTS;

  quickProduct?: Product;

  ngOnInit() {}

  get filteredProducts() {
    return this.products.filter(p => p.category === this.activeTab);
  }

  selectTab(cat: Category) {
    this.activeTab = cat;
  }

  openQuickView(prod: Product) {
    this.quickProduct = prod;
  }

  closeQuickView() {
    this.quickProduct = undefined;
  }
}
