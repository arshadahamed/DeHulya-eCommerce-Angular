import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Category } from '../../models/category.model';



@Component({
  selector: 'app-category-card',
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  categories: Category[] = [
    { title: 'Rings', imageUrl: 'img/collection/collection__9.png', itemsCount: 1 },
    { title: 'Bracelets', imageUrl: 'img/collection/collection__10.png', itemsCount: 5 },
    { title: 'Earring', imageUrl: 'img/collection/collection__11.png', itemsCount: 5 },
    { title: 'Necklaces', imageUrl: 'img/collection/collection__12.png', itemsCount: 5 },
    { title: 'Brooches and Pins', imageUrl: 'img/collection/collection__13.png', itemsCount: 5 },
    { title: 'Cap', imageUrl: 'img/collection/collection__9.png', itemsCount: 5 }
  ];

}
