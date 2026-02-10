import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  quantity = 1;

  constructor(private readonly cartService: CartService) {}

  onQuantityChange(quantity: number | string): void {
    this.quantity = this.normalizeQuantity(quantity);
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
  }

  private normalizeQuantity(quantity: number | string): number {
    const parsedQuantity = Number(quantity);

    if (!Number.isFinite(parsedQuantity)) {
      return 1;
    }

    return Math.max(1, Math.floor(parsedQuantity));
  }
}
