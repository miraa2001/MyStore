import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

export interface LastOrder {
  customerName: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private lastOrder: LastOrder | null = null;

  private readonly feedbackMessageSubject = new BehaviorSubject<string>('');
  private readonly itemCountSubject = new BehaviorSubject<number>(0);

  readonly feedbackMessage$ = this.feedbackMessageSubject.asObservable();
  readonly itemCount$ = this.itemCountSubject.asObservable();

  getItems(): CartItem[] {
    return this.items.map((item) => ({ ...item }));
  }

  addToCart(product: Product, quantity: number): void {
    const normalizedQuantity = this.normalizeQuantity(quantity);
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += normalizedQuantity;
      this.feedbackMessageSubject.next(`${product.name} quantity updated to ${existingItem.quantity}.`);
    } else {
      this.items.push({ product, quantity: normalizedQuantity });
      this.feedbackMessageSubject.next(`${product.name} added to cart.`);
    }

    this.emitItemCount();
  }

  updateQuantity(productId: number, quantity: number): void {
    const existingItem = this.items.find((item) => item.product.id === productId);

    if (!existingItem) {
      return;
    }

    existingItem.quantity = this.normalizeQuantity(quantity);
    this.feedbackMessageSubject.next(`${existingItem.product.name} quantity updated to ${existingItem.quantity}.`);
    this.emitItemCount();
  }

  removeFromCart(productId: number): void {
    const itemIndex = this.items.findIndex((item) => item.product.id === productId);

    if (itemIndex === -1) {
      return;
    }

    const removedItem = this.items[itemIndex];
    this.items.splice(itemIndex, 1);
    this.feedbackMessageSubject.next(`${removedItem.product.name} removed from cart.`);
    this.emitItemCount();
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart(): void {
    this.items = [];
    this.feedbackMessageSubject.next('Cart cleared.');
    this.emitItemCount();
  }

  setLastOrder(customerName: string, total: number): void {
    this.lastOrder = {
      customerName,
      total
    };
  }

  getLastOrder(): LastOrder | null {
    return this.lastOrder;
  }

  private normalizeQuantity(quantity: number): number {
    if (!Number.isFinite(quantity)) {
      return 1;
    }

    return Math.max(1, Math.floor(quantity));
  }

  private emitItemCount(): void {
    const itemCount = this.items.reduce((count, item) => count + item.quantity, 0);
    this.itemCountSubject.next(itemCount);
  }
}
