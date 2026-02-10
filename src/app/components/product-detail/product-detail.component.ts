import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, of, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  quantity = 1;
  feedbackMessage = '';

  private routeSubscription?: Subscription;
  private feedbackSubscription?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) => {
          if (!Number.isFinite(id)) {
            return of(undefined);
          }

          return this.productService.getProductById(id);
        })
      )
      .subscribe((product) => {
        this.product = product;
      });

    this.feedbackSubscription = this.cartService.feedbackMessage$.subscribe((message) => {
      this.feedbackMessage = message;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.feedbackSubscription?.unsubscribe();
  }

  onQuantityChange(quantity: number | string): void {
    this.quantity = this.normalizeQuantity(quantity);
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

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
