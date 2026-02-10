import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  customerName = '';
  total = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    const queryName = this.route.snapshot.queryParamMap.get('name');
    const queryTotal = Number(this.route.snapshot.queryParamMap.get('total'));

    if (queryName) {
      this.customerName = queryName;
    }

    if (Number.isFinite(queryTotal) && queryTotal > 0) {
      this.total = queryTotal;
    }

    if (!this.customerName || this.total <= 0) {
      const lastOrder = this.cartService.getLastOrder();

      if (!lastOrder) {
        return;
      }

      this.customerName = lastOrder.customerName;
      this.total = lastOrder.total;
    }
  }
}
