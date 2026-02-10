import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  private itemCountSubscription?: Subscription;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.itemCountSubscription = this.cartService.itemCount$.subscribe((itemCount) => {
      this.cartItemCount = itemCount;
    });
  }

  ngOnDestroy(): void {
    this.itemCountSubscription?.unsubscribe();
  }
}
