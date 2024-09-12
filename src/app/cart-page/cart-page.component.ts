import { priceSummary } from './../data-types';
import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  carData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    delivery: 0,
    tax: 0,
    total: 0,
  };

  constructor(
    private _productService: ProductsService,
    private router: Router
  ) {}
  ngOnInit() {
this.loadDetails();
  }

  loadDetails(){
    this._productService.currentCart().subscribe((data) => {
      // console.log(data)
      this.carData = data;
      let price = 0;
      data.forEach((item) => {
        if (item.quantity) {
          price = price + item.price * item.quantity;
        }
      });
      (this.priceSummary.price = price),
        (this.priceSummary.delivery = 100),
        (this.priceSummary.discount = price / 10),
        (this.priceSummary.tax = price / 5),
        (this.priceSummary.total = price - price / 10 + price / 5 + 100);
        //if cart data has no items  & undefined 
        if(!this.carData.length){
          this.router.navigate(['/']);
        }
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId:string|undefined){
    cartId && this._productService.removeToCartById(cartId).subscribe((result)=>{
      this.loadDetails();
    })
  }
}
