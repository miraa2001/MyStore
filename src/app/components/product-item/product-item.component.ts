import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

export interface AddToCartEvent {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCartRequested = new EventEmitter<AddToCartEvent>();

  quantity = 1;

  onQuantityChange(quantity: number | string): void {
    this.quantity = this.normalizeQuantity(quantity);
  }

  addToCart(): void {
    this.addToCartRequested.emit({
      product: this.product,
      quantity: this.quantity
    });
  }

  private normalizeQuantity(quantity: number | string): number {
    const parsedQuantity = Number(quantity);

    if (!Number.isFinite(parsedQuantity)) {
      return 1;
    }

    return Math.max(1, Math.floor(parsedQuantity));
  }
}
