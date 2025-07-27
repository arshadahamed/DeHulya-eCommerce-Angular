import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HeroSectionComponent } from "../../features/home/components/hero-section/hero-section.component";
import { FeatureSectionComponent } from "../../features/home/components/feature-section/feature-section.component";
import { BestSellingComponent } from '../../features/home/components/best-selling/best-selling.component';


@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, FeatureSectionComponent,BestSellingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
