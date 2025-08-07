import { AfterViewInit, AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../component/product-card/product-card.component';
import { QuickViewComponent } from '../../../../component/shared/quick-view/quick-view.component';
import { CATEGORIES } from '../../../../data/category.data';
import { ProductService } from '../../../../services/product.service';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, filter, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { Product } from '../../../../models/product.model';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, QuickViewComponent, SlickCarouselModule],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css']
})
export class BestSellingComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @ViewChild('carouselContainer', { read: ElementRef }) carouselContainer!: ElementRef;

  categories = CATEGORIES;
  private activeTabSubject = new BehaviorSubject<Category>(CATEGORIES[0]);
  activeTab$ = this.activeTabSubject.asObservable();

  filteredProducts$: Observable<Product[]> = new Observable<Product[]>();
  quickProduct?: Product;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    infinite: false,  // Change to true once stable
  };

  private carouselNeedsReinit = false;
  private carouselInitialized = false;

  filteredProductCount = 0;

  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.productService.loadProductsFromApi().pipe(take(1)).subscribe();

    this.filteredProducts$ = combineLatest([
      this.productService.products$.pipe(
        filter(products => products.length > 0),
        distinctUntilChanged((prev, curr) => this.arraysAreEqualById(prev, curr))
      ),
      this.activeTab$.pipe(
        distinctUntilChanged((prev, curr) => prev.title === curr.title)
      )
    ]).pipe(
      map(([products, category]) => {
        const filtered = products.filter(p => p.category.title === category.title && p.status === 'active');

        // Deduplicate by product id just in case
        const unique = filtered.filter((prod, index, self) =>
          index === self.findIndex(p => p.id === prod.id)
        );

        return unique;
      })
    );

    this.filteredProducts$.pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.filteredProductCount = products.length;
      this.carouselNeedsReinit = true;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit() {
    try {
      if (this.slickModal && !this.carouselInitialized) {
        this.slickModal.initSlick();
        this.carouselInitialized = true;
      }
    } catch (error) {
      console.warn('Error initializing slick carousel on view init:', error);
    }
  }

  ngAfterViewChecked() {
    if (this.carouselNeedsReinit && this.slickModal && this.carouselContainer) {
      const containerNative = this.carouselContainer.nativeElement;
      const hasSlides = containerNative && containerNative.children.length > 0;

      if (hasSlides && this.filteredProductCount > 0) {
        try {
          if (this.carouselInitialized) {
            this.slickModal.unslick();
            this.carouselInitialized = false;
          }
        } catch (unslickErr) {
          console.warn('Error during slick unslick:', unslickErr);
        }

        setTimeout(() => {
          try {
            if (this.slickModal) {
              this.slickModal.initSlick();
              this.carouselInitialized = true;
              this.carouselNeedsReinit = false;
            }
          } catch (initErr) {
            console.warn('Error during slick init:', initErr);
          }
        }, 150);
      }
    }
  }

  selectTab(cat: Category) {
    if (cat.title !== this.activeTabSubject.value.title) {
      this.activeTabSubject.next(cat);
    }
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private arraysAreEqualById(arr1: Product[], arr2: Product[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].id !== arr2[i].id) return false;
    }
    return true;
  }
}
