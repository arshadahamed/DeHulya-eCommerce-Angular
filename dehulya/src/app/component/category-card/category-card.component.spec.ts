import { Component, Input } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() categories: Category[] = [
    { id: 1, title: 'Rings', imageUrl: 'img/collection/collection__9.png' },
    { id: 2, title: 'Bracelets', imageUrl: 'img/collection/collection__10.png' },
    { id: 3, title: 'Earring', imageUrl: 'img/collection/collection__11.png' },
    { id: 4, title: 'Necklaces', imageUrl: 'img/collection/collection__12.png' },
    { id: 5, title: 'Brooches and Pins', imageUrl: 'img/collection/collection__13.png' },
    { id: 6, title: 'Cap', imageUrl: 'img/collection/collection__9.png' }
  ];
}
