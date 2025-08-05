import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Banner {
  imageUrl: string;
  label: string;
  title: string;
  linkUrl: string;
  buttonText: string;
}

@Component({
  selector: 'app-banner-card',
  imports: [CommonModule],
  templateUrl: './banner-card.component.html',
  styleUrl: './banner-card.component.css'
})
export class BannerCardComponent {

  banners: Banner[] = [
    {
      imageUrl: 'img/banner/banner__10.jpg',
      label: 'Exclusive',
      title: 'Wedding Rings',
      linkUrl: 'categories.html',
      buttonText: 'Shop Now'
    },
    {
      imageUrl: 'img/banner/banner__11.jpg',
      label: 'Beautiful',
      title: 'Diamond Lockets',
      linkUrl: 'categories.html',
      buttonText: 'Shop Now'
    }
  ];
}
