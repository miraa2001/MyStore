import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  feedbackMessage = '';

  private feedbackSubscription?: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.feedbackSubscription = this.cartService.feedbackMessage$.subscribe((message) => {
      this.feedbackMessage = message;
    });
  }

  ngOnDestroy(): void {
    this.feedbackSubscription?.unsubscribe();
  }
}
