import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  total = 0;
  feedbackMessage = '';

  private feedbackSubscription?: Subscription;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.refreshCart();

    this.feedbackSubscription = this.cartService.feedbackMessage$.subscribe((message) => {
      this.feedbackMessage = message;
      this.refreshCart();
    });
  }

  ngOnDestroy(): void {
    this.feedbackSubscription?.unsubscribe();
  }

  onQuantityChange(productId: number, quantity: number | string): void {
    const normalizedQuantity = this.normalizeQuantity(quantity);
    this.cartService.updateQuantity(productId, normalizedQuantity);
    this.refreshCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.refreshCart();
  }

  private refreshCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  private normalizeQuantity(quantity: number | string): number {
    const parsedQuantity = Number(quantity);

    if (!Number.isFinite(parsedQuantity)) {
      return 1;
    }

    return Math.max(1, Math.floor(parsedQuantity));
  }
}
