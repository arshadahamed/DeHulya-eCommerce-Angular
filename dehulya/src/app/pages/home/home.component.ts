import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../features/home/components/hero-section/hero-section.component";
import { FeatureSectionComponent } from "../../features/home/components/feature-section/feature-section.component";
import { BestSellingComponent } from '../../features/home/components/best-selling/best-selling.component';
import { BannerSectionComponent } from "../../features/home/components/banner-section/banner-section.component";


@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, FeatureSectionComponent, BestSellingComponent, BannerSectionComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
