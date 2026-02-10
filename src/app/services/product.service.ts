import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productsUrl = 'assets/data.json';
  private readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(shareReplay(1));

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(map((products) => products.find((product) => product.id === id)));
  }
}
