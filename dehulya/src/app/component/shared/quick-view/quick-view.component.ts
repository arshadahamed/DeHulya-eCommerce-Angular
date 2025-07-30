import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements AfterViewInit {
  @Input() product!: Product;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalRef', { static: true }) modalRef!: ElementRef<HTMLElement>;
  private bsModal!: Modal;

  // only needed if you still want variant selection
  selectedVariant?: string;

  ngAfterViewInit() {
    this.bsModal = new Modal(this.modalRef.nativeElement, { backdrop: true });
    this.bsModal.show();
    this.modalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.closed.emit();
    });
  }

  close() {
    this.bsModal.hide();
  }
}
