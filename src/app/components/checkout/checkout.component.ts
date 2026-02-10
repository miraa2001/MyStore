import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface CheckoutFormModel {
  fullName: string;
  address: string;
  creditCard: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutModel: CheckoutFormModel = {
    fullName: '',
    address: '',
    creditCard: ''
  };

  total = 0;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.total = this.cartService.getTotal();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || this.total <= 0) {
      return;
    }

    const customerName = this.checkoutModel.fullName.trim();

    this.cartService.setLastOrder(customerName, this.total);
    this.cartService.clearCart();

    this.router.navigate(['/confirmation'], {
      queryParams: {
        name: customerName,
        total: this.total.toFixed(2)
      }
    });
  }
}
