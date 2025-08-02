// src/app/product-card/product-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CountdownDirective } from '../../directives/countdown.directive';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    CountdownDirective, RouterLink
  ],
  providers: [
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() quickView = new EventEmitter<void>();

  get discountPercent(): number {
    if (this.product.onSale && this.product.salePrice != null) {
      return Math.round(100 * (1 - this.product.salePrice! / this.product.price));
    }
    return 0;
  }

  onQuickViewClick() {
    this.quickView.emit();
  }
}
