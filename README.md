# MyStore

## Project Overview
MyStore is an Angular single-page e-commerce application.
It supports product browsing, product detail views, cart management, checkout submission, and order confirmation.
Users can add products to the cart, update quantities, remove items, and place an order through a validated checkout form.

## Tech Stack
- Angular
- Angular Router
- Angular HttpClient
- Template-driven forms with `FormsModule`, `[(ngModel)]`, and `(ngModelChange)`
- TypeScript services for shared state and application logic

## Data Source
Product data is loaded from `src/assets/data.json` using Angular `HttpClient`.
This local JSON file simulates an external API response for catalog and detail views.

## Application Structure
### Components
- `ProductList` / `ProductItem`: displays the product catalog and handles add-to-cart actions.
- `ProductDetail`: shows product image, name, price, description, and quantity-based add-to-cart.
- `Cart`: lists cart items, updates quantities, removes items, and displays total cost.
- `Checkout`: collects customer details with template-driven validation and submits the order.
- `Confirmation`: displays successful order confirmation with customer and total information.
- `Header`: provides navigation links and cart access.

### Services
- `ProductService`: fetches product data.
- `CartService`: stores shared cart state and cart operations across routes.

## State Management & Data Flow
Cart state is centralized in `CartService` and shared across unrelated components.
Parent-to-child rendering uses `@Input` for passing product data into `ProductItem`.
Child-to-parent communication uses `@Output` in `ProductItem` to notify `ProductList` when add-to-cart is requested.
Routing manages view transitions between product list, product detail, cart, checkout, and confirmation pages.

## Install and Run
```bash
npm install
ng serve
```

Default URL: `http://localhost:4200/`.
