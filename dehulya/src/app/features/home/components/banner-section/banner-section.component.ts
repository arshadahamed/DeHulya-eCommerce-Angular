import { Component } from '@angular/core';
import { CategoryCardComponent } from "../../../../component/category-card/category-card.component";
import { BannerCardComponent } from "../../../../component/banner-card/banner-card.component";

@Component({
  selector: 'app-banner-section',
  imports: [CategoryCardComponent, BannerCardComponent],
  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.css'
})
export class BannerSectionComponent {

}
